/**
 * TypeScript definitions for WebCake Data library
 */

export interface DBConnectionConfig {
  baseURL?: string;
  siteId?: string;
  token?: string;
  headers?: Record<string, string>;
}

export interface FieldData {
  field_name: string;
  field_value: any;
}

export interface PopulateConfig {
  field: string;
  table: string;
  referenceField: string;
  select?: string;
  where?: string;
  sort?: string;
  limit?: number | null;
  skip?: number;
  justOne?: boolean;
}

export interface QueryParams {
  filters?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  select?: string | string[];
  populate?: PopulateConfig[];
}

export interface UpdateResult {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
}

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

export interface CountResult {
  count: number;
}

export interface ExistsResult {
  exists: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export declare class QueryBuilder {
  constructor(collectionName: string, apiClient: DBConnection);
  
  where(field: string, operator: string | any, value?: any): QueryBuilder;
  eq(field: string, value: any): QueryBuilder;
  gt(field: string, value: any): QueryBuilder;
  gte(field: string, value: any): QueryBuilder;
  lt(field: string, value: any): QueryBuilder;
  lte(field: string, value: any): QueryBuilder;
  in(field: string, values: any[]): QueryBuilder;
  nin(field: string, values: any[]): QueryBuilder;
  ne(field: string, value: any): QueryBuilder;
  between(field: string, value1: any, value2: any): QueryBuilder;
  like(field: string, pattern: string): QueryBuilder;
  sort(sortObj: Record<string, 1 | -1>): QueryBuilder;
  limit(n: number): QueryBuilder;
  skip(n: number): QueryBuilder;
  select(fields: string | string[]): QueryBuilder;
  populate(config: PopulateConfig): QueryBuilder;
  exec(): Promise<any[]>;
  then(resolve: (value: any[]) => any, reject?: (reason: any) => any): Promise<any>;
}

export declare class DBModel {
  constructor(collectionName: string, apiClient: DBConnection);
  
  create(data: Record<string, any>): Promise<any>;
  insertMany(dataArray: Record<string, any>[]): Promise<any[]>;
  find(filters?: Record<string, any>): QueryBuilder;
  findOne(filters?: Record<string, any>): Promise<any | null>;
  findById(id: string): Promise<any | null>;
  updateOne(filters: Record<string, any>, updateData: Record<string, any>): Promise<UpdateResult>;
  findByIdAndUpdate(id: string, updateData: Record<string, any>, options?: { new?: boolean }): Promise<any>;
  findOneAndUpdate(filters: Record<string, any>, updateData: Record<string, any>): Promise<any>;
  updateMany(filters: Record<string, any>, updateData: Record<string, any>): Promise<UpdateResult>;
  deleteOne(filters: Record<string, any>): Promise<DeleteResult>;
  findByIdAndDelete(id: string): Promise<any>;
  findOneAndDelete(filters: Record<string, any>): Promise<any>;
  deleteMany(filters: Record<string, any>): Promise<DeleteResult>;
  countDocuments(filters?: Record<string, any>): Promise<number>;
  exists(filters: Record<string, any>): Promise<boolean>;
}

export declare class DBConnection {
  baseURL: string;
  siteId: string;
  headers: Record<string, string>;
  
  constructor(config?: DBConnectionConfig);
  
  model(collectionName: string): DBModel;
  insertOne(tableName: string, fields: FieldData[]): Promise<any>;
  insertMany(tableName: string, records: FieldData[][]): Promise<any[]>;
  query(tableName: string, queryParams: QueryParams): Promise<any[]>;
  updateById(tableName: string, id: string, fields: FieldData[]): Promise<any>;
  updateOne(tableName: string, filters: Record<string, any>, fields: FieldData[]): Promise<any>;
  updateMany(tableName: string, filters: Record<string, any>, fields: FieldData[]): Promise<any>;
  deleteById(tableName: string, id: string): Promise<any>;
  deleteOne(tableName: string, filters: Record<string, any>): Promise<any>;
  deleteMany(tableName: string, filters: Record<string, any>): Promise<any>;
  count(tableName: string, filters: Record<string, any>): Promise<CountResult>;
  exists(tableName: string, filters: Record<string, any>): Promise<ExistsResult>;
}

// Global declarations for browser usage
declare global {
  interface Window {
    WebCakeData: {
      DBConnection: typeof DBConnection;
      DBModel: typeof DBModel;
      QueryBuilder: typeof QueryBuilder;
    };
  }
}

export { DBConnection as default };
