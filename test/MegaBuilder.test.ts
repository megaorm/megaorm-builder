import { MegaBuilder } from '../src';
import { Insert } from '../src';
import { Select } from '../src';
import { Update } from '../src';
import { Delete } from '../src';

import { QueryError } from '@megaorm/errors';

const mock = {
  connection: () => {
    return {
      id: Symbol('MegaPoolConnection'),
      driver: { id: Symbol('MySQL') },
      query: jest.fn(() => Promise.resolve()),
    } as any;
  },
};

describe('MegaBuilder', () => {
  let connection: jest.Mocked<any>;

  beforeEach(() => {
    connection = mock.connection() as jest.Mocked<any>;
  });

  describe('constructor', () => {
    it('should create an instance with a valid connection', () => {
      const builder = new MegaBuilder(connection);
      expect(builder).toBeInstanceOf(MegaBuilder);
    });

    it('should throw an error for an invalid connection', () => {
      expect(() => new MegaBuilder(null as unknown as any)).toThrow(QueryError);
    });
  });

  describe('get.connection', () => {
    it('should return the current connection', () => {
      const builder = new MegaBuilder(connection);
      expect(builder.get.connection()).toBe(connection);
    });

    it('should throw an error if the connection is invalid', () => {
      const builder = new MegaBuilder(connection);
      (builder as any).connection = null;
      expect(() => builder.get.connection()).toThrow(QueryError);
    });
  });

  describe('get.connection', () => {
    it('should update the current connection', () => {
      const builder = new MegaBuilder(connection);
      expect(builder.get.connection()).toBe(connection);

      // Set connection
      builder.set.connection(mock.connection());
      expect(builder.get.connection()).not.toBe(connection);
    });

    it('should throw an error if the connection is invalid', () => {
      const builder = new MegaBuilder(connection);
      expect(() => builder.set.connection(null as any)).toThrow(QueryError);
    });
  });

  describe('raw', () => {
    it('should execute a raw query', async () => {
      connection.query.mockResolvedValue([{ id: 1, name: 'John Doe' }]);
      const builder = new MegaBuilder(connection);

      const result = await builder.raw('SELECT * FROM users');
      expect(connection.query).toHaveBeenCalledWith(
        'SELECT * FROM users',
        undefined
      );

      expect(result).toEqual([{ id: 1, name: 'John Doe' }]);
    });
  });

  describe('insert', () => {
    it('should return an Insert builder instance', () => {
      const builder = new MegaBuilder(connection);
      const insertBuilder = builder.insert();
      expect(insertBuilder).toBeInstanceOf(Insert);
    });
  });

  describe('select', () => {
    it('should return a Select builder instance', () => {
      const builder = new MegaBuilder(connection);
      const selectBuilder = builder.select();
      expect(selectBuilder).toBeInstanceOf(Select);
    });
  });

  describe('update', () => {
    it('should return an Update builder instance', () => {
      const builder = new MegaBuilder(connection);
      const updateBuilder = builder.update();
      expect(updateBuilder).toBeInstanceOf(Update);
    });
  });

  describe('delete', () => {
    it('should return a Delete builder instance', () => {
      const builder = new MegaBuilder(connection);
      const deleteBuilder = builder.delete();
      expect(deleteBuilder).toBeInstanceOf(Delete);
    });
  });
});
