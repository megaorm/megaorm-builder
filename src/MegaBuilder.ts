import { Delete } from './sql/Delete';
import { Insert } from './sql/Insert';
import { Select } from './sql/Select';
import { Update } from './sql/Update';

import { isPoolCon } from '@megaorm/utils';
import { QueryError } from '@megaorm/errors';
import { MegaPoolConnection } from '@megaorm/pool';
import { MegaQueryResult, Row, Rows } from '@megaorm/driver';

/**
 * `MegaBuilder` A Simple Yet Powerful Query Builder
 *
 * - `Clean API`: Easily build queries using a chainable method style.
 * - `Parameterized Queries`: Safely handle dynamic values to prevent SQL injection.
 * - `Flexible Query Builders`: Separate builders for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
 * - `Error Validation`: Catch invalid inputs early to avoid runtime issues.
 */
export class MegaBuilder {
  /**
   * The `MegaPoolConnection` instnace to execute queries
   */
  private connection: MegaPoolConnection;

  /**
   * Provides getter methods for `MegaBuilder` instance.
   */
  public get = {
    /**
     * Retrieves the current database connection.
     *
     * @returns The current `MegaPoolConnection` instance.
     * @throws `QueryError` if the connection is invalid.
     */
    connection: () => {
      if (!isPoolCon(this.connection)) {
        throw new QueryError(`Invalid connection: ${String(this.connection)}`);
      }

      return this.connection;
    },
  };

  /**
   * Provides setter methods for the `MegaBuilder` instance.
   */
  public set = {
    /**
     * Updates the database connection.
     *
     * @param connection The new `MegaPoolConnection` instance.
     * @throws `QueryError` if the provided connection is invalid.
     */
    connection: (connection: MegaPoolConnection) => {
      if (!isPoolCon(connection)) {
        throw new QueryError(`Invalid connection: ${String(connection)}`);
      }

      this.connection = connection;
    },
  };

  /**
   * Creates a new `MegaBuilder` instance with the provided pool connection.
   *
   * @param connection The connection object used to interact with the pool.
   * @throws `QueryError` if the provided connection is invalid.
   */
  constructor(connection: MegaPoolConnection) {
    if (!isPoolCon(connection)) {
      throw new QueryError(`Invalid connection: ${String(connection)}`);
    }

    this.connection = connection;
  }

  /**
   * Executes a raw SQL query with optional parameterized values.
   *
   * @template R The type of the expected query result.
   * @param query The raw SQL query string to execute.
   * @param values Optional array of parameter values for the query.
   * @returns A promise that resolves to the query result of type `R`.
   * @throws `QueryError` if the query string or values are invalid.

   */
  public raw<R = MegaQueryResult>(
    query: string,
    values?: Array<string | number>
  ): Promise<R> {
    return this.connection.query(query, values) as Promise<R>;
  }

  /**
   * Creates an `Insert` query builder to build and execute `INSERT` queries.
   *
   * @template T The type of the expected resolve value.
   * @returns An instance of the `Insert` builder.
   */
  public insert<
    T extends number | string | void | Row | Rows =
      | number
      | string
      | void
      | Row
      | Rows
  >(): Insert<T> {
    return new Insert<T>(this.connection);
  }

  /**
   * Creates a `Select` query builder to build and execute `SELECT` queries.
   *
   * @returns An instance of the `Select` builder.
   */
  public select(): Select {
    return new Select(this.connection);
  }

  /**
   * Creates an `Update` query builder for building and executing `UPDATE` queries.
   *
   * @returns An instance of the `Update` builder.
   */
  public update(): Update {
    return new Update(this.connection);
  }

  /**
   * Creates a `Delete` query builder for building and executing `DELETE` queries.
   *
   * @returns An instance of the `Delete` builder.
   */
  public delete(): Delete {
    return new Delete(this.connection);
  }
}
