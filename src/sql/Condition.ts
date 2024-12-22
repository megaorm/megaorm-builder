import { QueryError } from '@megaorm/errors';
import { MegaPoolConnection } from '@megaorm/pool';
import { isMySQL, isPoolCon, isPostgreSQL } from '@megaorm/utils';
import {
  isChildOf,
  isEmptyArr,
  isEmptyStr,
  isFullStr,
  isFunc,
  isInt,
  isNum,
  isStr,
} from '@megaorm/test';

import { Select } from './Select';
import { Query } from './Query';

/**
 * Represents a reference to a database column.
 */
class Ref {
  /** The name of the column. */
  column: string;

  /**
   * Creates a new reference to the given column.
   * @param column The name of the column.
   */
  constructor(column: string) {
    this.column = column;
  }
}

/**
 * Creates a reference to a database column.
 *
 * @param column The name of the column.
 * @returns A `Ref` object referencing the given column.
 * @throws `QueryError` if the column name is invalid.
 */
export function ref(column: string): any {
  if (!isFullStr(column)) {
    throw new QueryError(`Invalid column reference: ${column}`);
  }

  return new Ref(column);
}

/**
 * Returns a SQL expression for extracting the date part from the given column.
 *
 * @param col The name of the column.
 * @returns The SQL expression for extracting the date part.
 * @throws `QueryError` if the column name is invalid.
 */
export function exDate(col: string): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  return `DATE(${col})`;
}

/**
 * Returns a SQL expression for extracting the time part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the time part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exTime(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `TIME(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `TO_CHAR(${col}, 'HH24:MI:SS')`;
  }

  return `STRFTIME('%H:%M:%S', ${col})`;
}

/**
 * Returns a SQL expression for extracting the year part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the year part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exYear(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `YEAR(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(YEAR FROM ${col})`;
  }

  return `STRFTIME('%Y', ${col})`;
}

/**
 * Returns a SQL expression for extracting the month part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the month part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exMonth(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `MONTH(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(MONTH FROM ${col})`;
  }

  return `STRFTIME('%m', ${col})`;
}

/**
 * Returns a SQL expression for extracting the day part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the day part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exDay(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `DAY(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(DAY FROM ${col})`;
  }

  return `STRFTIME('%d', ${col})`;
}

/**
 * Returns a SQL expression for extracting the hour part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the hour part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exHour(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `HOUR(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(HOUR FROM ${col})`;
  }

  return `STRFTIME('%H', ${col})`;
}

/**
 * Returns a SQL expression for extracting the minute part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the minute part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exMinute(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `MINUTE(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(MINUTE FROM ${col})`;
  }

  return `STRFTIME('%M', ${col})`;
}

/**
 * Returns a SQL expression for extracting the second part from the given column.
 *
 * @param col The name of the column.
 * @param con The connection object.
 * @returns The SQL expression for extracting the second part.
 * @throws `QueryError` if the column name or connection is invalid.
 */
export function exSecond(col: string, con: MegaPoolConnection): string {
  if (!isStr(col)) {
    throw new QueryError(`Invalid column name: ${col}`);
  }

  if (!isPoolCon(con)) {
    throw new QueryError(`Invalid connection: ${con}`);
  }

  if (isMySQL(con.driver)) {
    return `SECOND(${col})`;
  }

  if (isPostgreSQL(con.driver)) {
    return `EXTRACT(SECOND FROM ${col})`;
  }

  return `STRFTIME('%S', ${col})`;
}

/**
 * Comparison operators for SQL query conditions.
 * These constants represent different SQL operators used to build conditions.
 * They are typically used to compare columns or values in the `WHERE` clause of a query.
 */
export const EQUAL = Symbol('=');
export const NOT_EQUAL = Symbol('!=');

export const LESS = Symbol('<');
export const LESS_OR_EQUAL = Symbol('<=');

export const MORE = Symbol('>');
export const MORE_OR_EQUAL = Symbol('>=');

/**
 * Type representing valid comparison operators.
 * The operators are used in conditions for SQL queries to compare values.
 */
type Operator =
  | typeof EQUAL
  | typeof NOT_EQUAL
  | typeof LESS
  | typeof LESS_OR_EQUAL
  | typeof MORE
  | typeof MORE_OR_EQUAL;

/**
 * Checks if the provided operator is valid.
 *
 * @param operator The operator to validate.
 * @returns The `Condition` instance for chaining further query conditions.
 */
function invalidOperator(operator: any): boolean {
  return ![EQUAL, NOT_EQUAL, LESS, LESS_OR_EQUAL, MORE, MORE_OR_EQUAL].includes(
    operator
  );
}

/**
 * A function to set the column name for a condition.
 * Returns a `Condition` instance to allow further method chaining.
 * The column name must follow snake_case format.
 *
 * @param name The column name to be used in the condition.
 * @returns The `Condition` instance for chaining further query conditions.
 * @throws `QueryError` if the column name is not in snake_case format.
 */
export type Col = (name: string) => Condition;

/**
 * Alias for the `Condition` class.
 *
 * The `Condition` class is responsible for building SQL conditions
 * with syntax validation.
 */
export type Con = Condition;

/**
 * The `Condition` class is responsible for building SQL conditions
 * with syntax validation.
 *
 * Supports chaining methods to construct a condition dynamically
 * and validates operators, columns, and values to ensure they meet SQL standards.
 */
export class Condition {
  /**
   * Stack of condition components that make up the final query condition string.
   */
  private stack: string[] = new Array();

  /**
   * Flag to track negation of the condition, toggled if `NOT` is added.
   */
  private negate: boolean = false;

  /**
   * Counters for opened and closed parentheses, ensuring balanced syntax.
   */
  private opened: number = 0;

  /**
   * The associated query instance
   */
  private query: any;

  /**
   * Represents the main column involved in the condition.
   */
  private column: string;

  /**
   * Constructs a `Condition` instance for the given query
   *
   * @param query The query instance associated with this condition.
   *
   * @throws `QueryError` if the provided query is invalid.
   */
  constructor(query: Query<unknown>) {
    if (!isChildOf(query, Query)) {
      throw new QueryError(`Invalid query instance: ${String(query)}`);
    }

    this.query = query;
  }

  /**
   * Builds and returns the final condition string for a SQL query.
   *
   * @throws `QueryError` if there are syntax issues
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public build(): string {
    const condition = this.stack.join('').trim();

    if (this.opened !== 0) {
      throw new QueryError(`Syntax error: Unmatched parentheses.`);
    }

    if (/\(\s*AND|\(\s*OR/.test(condition)) {
      throw new QueryError(
        'Invalid syntax: AND/OR cannot directly follow an opening parenthesis.'
      );
    }

    if (/AND\s*\)|OR\s*\)/.test(condition)) {
      throw new QueryError(
        'Invalid syntax: AND/OR cannot directly precede a closing parenthesis.'
      );
    }

    if (/AND\s*AND|OR\s*OR/.test(condition)) {
      throw new QueryError(
        'Invalid syntax: Consecutive AND/OR operators found.'
      );
    }

    if (/\(\s*\)/.test(condition)) {
      throw new QueryError('Invalid syntax: Empty parentheses found.');
    }

    if (condition.endsWith('AND') || condition.endsWith('OR')) {
      throw new QueryError(
        'Invalid syntax: Condition cannot end with an operator.'
      );
    }

    if (condition.startsWith('AND') || condition.startsWith('OR')) {
      throw new QueryError(
        'Invalid syntax: Condition cannot start with an operator.'
      );
    }

    if (isEmptyStr(condition)) {
      throw new QueryError('Invalid syntax: Condition cannot be empty.');
    }

    return condition;
  }

  /**
   * Adds a raw SQL condition string to the condition stack.
   *
   * @param condition The raw SQL condition as a string.
   * @param values Optional values to replace placeholders within the condition.
   * @throws `QueryError` if the condition is not a string, or if provided values are not valid.
   */
  public raw(condition: string, ...values: Array<string | number>): this {
    if (!isFullStr(condition)) {
      throw new QueryError(`Invalid condition: ${String(condition)}`);
    }

    values.forEach((value) => {
      if (!(isFullStr(value) || isNum(value))) {
        throw new QueryError(`Invalid condition value: ${String(value)}`);
      }

      this.query.values.push(value);
    });

    this.stack.push(condition);
    return this;
  }

  /**
   * Negates the current condition by applying a `NOT` operator.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public not(): this {
    this.negate = true;
    return this;
  }

  /**
   * Adds an opening parenthesis `(` to the conditions.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   *
   */
  public open(): this {
    this.stack.push('(');
    this.opened++;
    return this;
  }

  /**
   * Adds a closing parenthesis `)` to the conditions.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public close(): this {
    this.stack.push(')');
    this.opened--;
    return this;
  }

  /**
   * Toggles the opening or closing of parentheses around the condition.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public paren(): this {
    return this.opened === 0 ? this.open() : this.close();
  }

  /**
   * Adds an `AND` logical operator to the condition.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public and(): this {
    this.stack.push(' AND ');
    return this;
  }

  /**
   * Adds an `OR` logical operator to the condition.
   *
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public or(): this {
    this.stack.push(' OR ');
    return this;
  }

  /**
   * Sets the column name for the condition.
   * The column name must follow snake_case conventions.
   *
   * @param name The column name to be used in the condition.
   * @returns The `Condition` instance for chaining further query conditions.
   * @throws `QueryError` if the column name is not in snake_case format.
   */
  public col(name: string): this {
    if (!isFullStr(name)) {
      throw new QueryError(`Invalid column name: ${String(name)}`);
    }

    this.column = name;
    return this;
  }

  /**
   * Compares the date portion of a `DATETIME` or `TIMESTAMP` or `DATE` column with a specified date value.
   *
   * This method allows you to compare only the **date** part (ignoring the time) of a `DATETIME`,
   * `TIMESTAMP` column with a given date string in `YYYY-MM-DD` format.
   *
   * @param date - The date value to compare, formatted as a string (`YYYY-MM-DD`).
   * @throws `QueryError` If the column is invalid, the date format is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare only the date part of the column.
   * - For **MySQL**, it uses the `DATE()` function.
   * - For **PostgreSQL**, it uses the `::DATE` cast or `DATE()` function.
   * - For **SQLite**, it uses the `DATE()` function.
   */
  public inDate(date: string | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = date instanceof Ref;

    if (!(isRef || isFullStr(date))) {
      throw new QueryError(`Invalid date: ${String(date)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? date.column : '?';

    this.stack.push(`${not}${exDate(this.column)} = ${placeholder}`);
    if (!isRef) this.query.values.push(date);

    this.negate = false;
    return this;
  }

  /**
   * Compares the time portion of a `DATETIME`, `TIMESTAMP`, or `TIME` column with a specified time value.
   *
   * This method allows you to compare only the **time** part (ignoring the date) of a `DATETIME`,
   * `TIMESTAMP`, or `TIME` column with a given time string in `hh:mm:ss` format.
   *
   * @param time The time value to compare, formatted as a string (`hh:mm:ss`).
   * @throws `QueryError` if the column is invalid, the time format is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the time part of the column.
   * - For **MySQL**, it uses the `TIME()` function.
   * - For **PostgreSQL**, it uses the `TO_CHAR()` function with a time format (`'HH24:MI:SS'`).
   * - For **SQLite**, it uses the `STRFTIME()` function with the format (`'%H:%M:%S'`).
   */
  public inTime(time: string | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = time instanceof Ref;

    if (!(isRef || isFullStr(time))) {
      throw new QueryError(`Invalid time: ${String(time)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? time.column : '?';

    this.stack.push(
      `${not}${exTime(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(time);

    this.negate = false;
    return this;
  }

  /**
   * Compares the year portion of a `DATETIME`, `TIMESTAMP`, or `DATE` column with a specified year value.
   *
   * This method allows you to compare only the **year** part of a `DATETIME`, `TIMESTAMP`, or `DATE` column
   * with a given year value.
   *
   * @param year The year value to compare, represented as an integer.
   * @throws `QueryError` If the column is invalid, the year value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the year part of the column.
   * - For **MySQL**, it uses the `YEAR()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(YEAR FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%Y', column)` function.
   */
  public inYear(year: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }
    const isRef = year instanceof Ref;

    if (!(isRef || (isInt(year) && year > 0))) {
      throw new QueryError(`Invalid year: ${String(year)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? year.column : '?';

    this.stack.push(
      `${not}${exYear(this.column, this.query.connection)} = ${placeholder}`
    );

    if (!isRef) this.query.values.push(year);

    this.negate = false;
    return this;
  }

  /**
   * Compares the month portion of a `DATETIME`, `TIMESTAMP`, or `DATE` column with a specified month value.
   *
   * This method allows you to compare only the **month** part of a `DATETIME`, `TIMESTAMP`, or `DATE` column
   * with a given month value.
   *
   * @param month The month value to compare, represented as an integer from `1` to `12`.
   * @throws `QueryError` if the column is invalid, the month value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the month part of the column.
   * - For **MySQL**, it uses the `MONTH()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(MONTH FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%m', column)` function.
   */
  public inMonth(month: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = month instanceof Ref;

    if (!(isRef || (isInt(month) && month >= 1 && month <= 12))) {
      throw new QueryError(`Invalid month: ${String(month)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? month.column : '?';
    this.stack.push(
      `${not}${exMonth(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(month);

    this.negate = false;
    return this;
  }

  /**
   * Compares the day portion of a `DATETIME`, `TIMESTAMP`, or `DATE` column with a specified day value.
   *
   * This method allows you to compare only the **day** part of a `DATETIME`, `TIMESTAMP`, or `DATE` column
   * with a given day value.
   *
   * @param day The day value to compare, represented as an integer from `1` to `31`.
   * @throws `QueryError` If the column is invalid, the day value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the day part of the column.
   * - For **MySQL**, it uses the `DAY()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(DAY FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%d', column)` function.
   */
  public inDay(day: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = day instanceof Ref;

    if (!(isRef || (isInt(day) && day >= 1 && day <= 31))) {
      throw new QueryError(`Invalid day: ${String(day)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? day.column : '?';

    this.stack.push(
      `${not}${exDay(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(day);

    this.negate = false;
    return this;
  }

  /**
   * Compares the hour portion of a `DATETIME`, `TIMESTAMP`, or `TIME` column with a specified hour value.
   *
   * This method allows you to compare only the **hour** part of a `DATETIME`, `TIMESTAMP`, or `TIME` column
   * with a given hour value.
   *
   * @param hour The hour value to compare, represented as an integer from `0` to `23`.
   * @throws `QueryError` if the column is invalid, the hour value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the hour part of the column.
   * - For **MySQL**, it uses the `HOUR()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(HOUR FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%H', column)` function.
   */
  public inHour(hour: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = hour instanceof Ref;

    if (!(isRef || (isInt(hour) && hour >= 0 && hour <= 23))) {
      throw new QueryError(`Invalid hour: ${String(hour)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? hour.column : '?';

    this.stack.push(
      `${not}${exHour(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(hour);

    this.negate = false;
    return this;
  }

  /**
   * Compares the minute portion of a `DATETIME`, `TIMESTAMP`, or `TIME` column with a specified minute value.
   *
   * This method allows you to compare only the **minute** part of a `DATETIME`, `TIMESTAMP`, or `TIME` column
   * with a given minute value.
   *
   * @param minute The minute value to compare, represented as an integer from `0` to `59`.
   * @throws `QueryError` if the column is invalid, the minute value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the minute part of the column.
   * - For **MySQL**, it uses the `MINUTE()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(MINUTE FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%M', column)` function.
   */
  public inMinute(minute: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = minute instanceof Ref;

    if (!(isRef || (isInt(minute) && minute >= 0 && minute <= 59))) {
      throw new QueryError(`Invalid minute: ${String(minute)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? minute.column : '?';

    this.stack.push(
      `${not}${exMinute(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(minute);

    this.negate = false;
    return this;
  }

  /**
   * Compares the second portion of a `DATETIME`, `TIMESTAMP`, or `TIME` column with a specified second value.
   *
   * This method allows you to compare only the **second** part of a `DATETIME`, `TIMESTAMP`, or `TIME` column
   * with a given second value. The value must be an integer between `0` and `59`.
   *
   * @param second The second value to compare, represented as an integer from `0` to `59`.
   * @throws `QueryError` if the column is invalid, the second value is incorrect, or the driver is unsupported.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * - This method uses the appropriate function to extract and compare just the second part of the column.
   * - For **MySQL**, it uses the `SECOND()` function.
   * - For **PostgreSQL**, it uses the `EXTRACT(SECOND FROM column)` function.
   * - For **SQLite**, it uses the `STRFTIME('%S', column)` function.
   */
  public inSecond(second: number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = second instanceof Ref;

    if (!(isRef || (isInt(second) && second >= 0 && second <= 59))) {
      throw new QueryError(`Invalid second: ${String(second)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? second.column : '?';

    this.stack.push(
      `${not}${exSecond(this.column, this.query.connection)} = ${placeholder}`
    );
    if (!isRef) this.query.values.push(second);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified value for equality.
   *
   * @param value The value to compare against the column. It can be either a `string` or a `number`.
   * @throws `QueryError` If the value or column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public equal(value: string | number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value) || isNum(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';

    this.stack.push(`${not}${this.column} = ${placeholder}`);
    if (!isRef) this.query.values.push(value);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified value to check if it's less than the value.
   *
   * @param value The value to compare against the column. It can be either a `string` or a `number`.
   * @throws `QueryError` if the value or column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   *
   */
  public lessThan(value: string | number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value) || isNum(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';

    this.stack.push(`${not}${this.column} < ${placeholder}`);
    if (!isRef) this.query.values.push(value);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified value to check if it's less than or equal to the value.
   *
   * @param value The value to compare against the column. It can be either a `string` or a `number`.
   * @throws `QueryError` if the value or column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public lessThanOrEqual(value: string | number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value) || isNum(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';

    this.stack.push(`${not}${this.column} <= ${placeholder}`);
    if (!isRef) this.query.values.push(value);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified value to check if it's greater than the value.
   *
   * @param value The value to compare against the column. It can be either a `string` or a `number`.
   * @throws `QueryError` If the value or column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public greaterThan(value: string | number | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value) || isNum(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';

    this.stack.push(`${not}${this.column} > ${placeholder}`);
    if (!isRef) this.query.values.push(value);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified value to check if it's greater than or equal to the value.
   *
   * @param value The value to compare against the column. It can be either a `string` or a `number`.
   * @throws `QueryError` if the value or column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public greaterThanOrEqual(value: string | number | Ref | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value) || isNum(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';

    this.stack.push(`${not}${this.column} >= ${placeholder}`);
    if (!isRef) this.query.values.push(value);

    this.negate = false;
    return this;
  }

  /**
   * Compares the column with a specified range to check if it's between the `start` and `end` values.
   *
   * @param start The starting value of the range. Can be either a `string` or a `number`.
   * @param end The ending value of the range. Can be either a `string` or a `number`.
   * @throws `QueryError` if the column, `start`, or `end` value is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public between(
    start: string | number | Ref,
    end: string | number | Ref
  ): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRefStart = start instanceof Ref;
    const isRefEnd = end instanceof Ref;

    if (!(isRefStart || isFullStr(start) || isNum(start))) {
      throw new QueryError(`Invalid start value: ${String(start)}`);
    }

    if (!(isRefEnd || isFullStr(end) || isNum(end))) {
      throw new QueryError(`Invalid end value: ${String(end)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const startHolder = isRefStart ? start.column : '?';
    const endHolder = isRefEnd ? end.column : '?';
    const condition = `${not}${this.column} BETWEEN ${startHolder} AND ${endHolder}`;

    if (!isRefStart) this.query.values.push(start);
    if (!isRefEnd) this.query.values.push(end);

    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Compares the column with a list of values to check if it is included in the list.
   *
   * @param values The values to check against the column. Each value can be either a `string` or a `number`.
   * @throws `QueryError` if the column is invalid or if the values array is empty or contains invalid values.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public in(...values: Array<string | number | Ref>): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    if (isEmptyArr(values)) {
      throw new QueryError(`Values array cannot be empty for IN clause`);
    }

    values.forEach((v) => {
      if (!(v instanceof Ref || isFullStr(v) || isNum(v))) {
        throw new QueryError(`Invalid value: ${String(v)}`);
      }
    });

    const not = this.negate ? 'NOT ' : '';
    const placeholders = values
      .map((v) => (v instanceof Ref ? v.column : '?'))
      .join(', ');
    const condition = `${not}${this.column} IN (${placeholders})`;

    values.forEach((v) =>
      v instanceof Ref ? null : this.query.values.push(v)
    );

    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Compares the column with a subquery to check if the column's value is in the result of the subquery.
   *
   * @param subquery A function that receives a `Select` instance as an argument, which you can use to build the subquery.
   * @throws `QueryError` if the column is invalid or if the subquery is not a function.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public inSubquery(subquery: (select: Select) => void): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    if (!isFunc(subquery)) {
      throw new QueryError(`Invalid subquery: ${String(subquery)}`);
    }

    const select = new Select(this.query.connection);

    subquery(select);

    const not = this.negate ? 'NOT ' : '';
    const condition = `${not}${this.column} IN (${select.build(true)})`;

    this.query.values.push(...select.get.values());
    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Compares the column to a specified value to check if it matches a pattern using the `LIKE` operator.
   *
   * @param value The value to compare against the column. It must be a non-empty string.
   * @throws `QueryError` if the column is invalid or if the value is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   * @notes
   * The `%` symbol is a wildcard in SQL:
   * - `%John%` means any value that contains `John` anywhere in the string.
   * - `John%` would match strings that start with `John`.
   * - `%John` would match strings that end with `John`.
   */
  public like(value: string | Ref): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const isRef = value instanceof Ref;

    if (!(isRef || isFullStr(value))) {
      throw new QueryError(`Invalid value: ${String(value)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const placeholder = isRef ? value.column : '?';
    const condition = `${not}${this.column} LIKE ${placeholder}`;

    if (!isRef) this.query.values.push(value);
    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Checks if a specified column is `NULL`. This condition is useful when you want to
   * filter results based on whether a column has no value (i.e., it is `NULL`).
   *
   * @throws `QueryError` if the column is invalid.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public isNull(): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    const not = this.negate ? 'NOT ' : '';
    const condition = `${not}${this.column} IS NULL`;

    this.stack.push(condition);
    this.negate = false;
    return this;
  }

  /**
   * Checks if any rows exist based on the result of a subquery.
   *
   * @param subquery A function that receives a `Select` instance, which you can use to build the subquery.
   * @throws `QueryError` if the subquery is not a valid function.
   * @returns The `Condition` instance for chaining further query conditions.
   * @note Subquery condition values are not going to be replaced with placeholders.
   */
  public exists(subquery: (select: Select) => void): this {
    if (!isFunc(subquery)) {
      throw new QueryError(`Invalid subquery: ${String(subquery)}`);
    }

    const select = new Select(this.query.connection);

    subquery(select); // build the query

    const not = this.negate ? 'NOT ' : '';
    const condition = `${not}EXISTS (${select.build(true)})`;

    this.query.values.push(...select.get.values());
    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Checks if the column value satisfies a condition when compared to any result from a subquery.
   * Use this method when you need to check if a column value satisfies a condition for at least one result
   * from a subquery.
   *
   * @param operator The operator (e.g., `=`, `>`, `<`, etc.) to use in the comparison.
   * @param subquery A function that receives a `Select` instance, which you can use to build the subquery.
   * @throws `QueryError` if the operator is invalid or the subquery is not a valid function.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public any(operator: Operator, subquery: (select: Select) => void): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    if (invalidOperator(operator)) {
      throw new QueryError(`Invalid operator: ${String(operator)}`);
    }

    if (!isFunc(subquery)) {
      throw new QueryError(`Invalid subquery: ${String(subquery)}`);
    }

    const select = new Select(this.query.connection);

    subquery(select); // build the query

    const not = this.negate ? 'NOT ' : '';
    const sign = operator.description;
    const query = select.build(true);
    const condition = `${not}${this.column} ${sign} ANY (${query})`;

    this.query.values.push(...select.get.values());
    this.stack.push(condition);
    this.negate = false;

    return this;
  }

  /**
   * Checks if the column value satisfies a condition when compared to all results from a subquery.
   * Use this method when you need to check if a column value satisfies a condition for all results
   * from a subquery.
   *
   * @param operator The operator (e.g., `EQUAL`, `LESS`, `MORE`, etc.) to use in the comparison.
   * @param subquery A function that receives a `Select` instance, which you can use to build the subquery.
   * @throws `QueryError` if the operator is invalid or the subquery is not a valid function.
   * @returns The `Condition` instance for chaining further query conditions.
   */
  public all(operator: Operator, subquery: (select: Select) => void): this {
    if (!isFullStr(this.column)) {
      throw new QueryError(`Invalid column: ${String(this.column)}`);
    }

    if (invalidOperator(operator)) {
      throw new QueryError(`Invalid operator: ${String(operator)}`);
    }

    if (!isFunc(subquery)) {
      throw new QueryError(`Invalid subquery: ${String(subquery)}`);
    }

    const select = new Select(this.query.connection);

    subquery(select); // build the query

    const not = this.negate ? 'NOT ' : '';
    const sign = operator.description;
    const query = select.build(true);
    const condition = `${not}${this.column} ${sign} ALL (${query})`;

    this.query.values.push(...select.get.values());
    this.stack.push(condition);
    this.negate = false;

    return this;
  }
}
