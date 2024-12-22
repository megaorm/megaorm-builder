import { isPoolCon } from '@megaorm/utils';
import { QueryError } from '@megaorm/errors';
import { MegaQueryResult } from '@megaorm/driver';
import { MegaPoolConnection } from '@megaorm/pool';

/**
 * Interface defining the methods for logging query information.
 */
interface Logger<T> {
  /**
   * Logs the current SQL query to the console.
   *
   * @returns The current Query instance for method chaining.
   */
  query(): Query<T>;

  /**
   * Logs the current SQL query values to the console.
   *
   * @returns The current Query instance for method chaining.
   */
  values(): Query<T>;
}

/**
 * Interface defining the methods for retrieving query parameters.
 */
interface Getter {
  /**
   * Get the SQL query string.
   *
   * @returns The SQL query string.
   */
  query(): string;

  /**
   * Get the SQL query string values.
   *
   * @returns An array of values.
   */
  values(): Array<string | number>;
}

/**
 * Abstract base class representing a database query.
 *
 * This class serves as a foundation for constructing SQL queries
 * and will be extended by specific query types like Select,
 * Update, Delete, and Insert.
 *
 * @template T The type of the expected result from the query execution.
 */
export abstract class Query<T> {
  /**
   * Array to hold the values associated with the SQL query parameters.
   */
  protected values: Array<any> = new Array();

  /**
   * The connection instance used to execute the query.
   */
  protected connection: MegaPoolConnection;

  /**
   * The SQL query string that will be executed.
   */
  protected query: string;

  /**
   * Logger for the current query, providing methods to log query details.
   */
  public log: Logger<T> = {
    query: () => (console.log(this.query ? this.query : this.build()), this),
    values: () => (console.log(this.values), this),
  };

  /**
   * Getter for retrieving query parameters including the SQL string, values, and connection.
   */
  public get: Getter = {
    query: (): string => (this.query ? this.query : this.build()),
    values: (): Array<string | number> => this.values,
  };

  /**
   * Creates a new instance of the `Query` class.
   * @param connection The `MegaPoolConnection` to associate with this query.
   * @throws `QueryError` if the provided connection is invalid.
   */
  constructor(connection: MegaPoolConnection) {
    if (!isPoolCon(connection)) {
      throw new QueryError(`Invalid connection: ${connection}`);
    }

    this.connection = connection;
  }

  /**
   * Executes the query and returns a promise with the result.
   * @returns A promise that resolves with the result of the query execution.
   */
  public exec(): Promise<T> {
    return this.connection.query(
      this.get.query(),
      this.get.values().flat()
    ) as Promise<T>;
  }

  /**
   * Executes a raw SQL query with optional values.
   *
   * @param query The SQL query string.
   * @param values Optional array of values to be used in the query.
   * @returns A promise that resolves with the raw query result.
   * @throws `QueryError` if the query or values are invalid.
   */
  public raw<R = MegaQueryResult>(
    query: string,
    values?: Array<string | number>
  ): Promise<R> {
    return this.connection.query(query, values) as Promise<R>;
  }

  /**
   * Resets the query to its initial state, allowing for reuse.
   * @returns A new instance of the `Query` class.
   */
  public abstract reset(): Query<T>;

  /**
   * Builds and returns the SQL query string based on the current state.
   * @returns The constructed SQL query string.
   */
  public abstract build(): string;
}
