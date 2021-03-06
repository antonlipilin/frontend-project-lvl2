import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('stylish format test with JSON objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.json`, `${__dirname}/../__fixtures__/nestedObject2.json`)).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('stylish format test with YAML objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.yml`, `${__dirname}/../__fixtures__/nestedObject2.yml`)).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('plain format test with JSON objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.json`, `${__dirname}/../__fixtures__/nestedObject2.json`, 'plain'))
    .toEqual(
      `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
    );
});

test('plain format test with YAML objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.yml`, `${__dirname}/../__fixtures__/nestedObject2.yml`, 'plain'))
    .toEqual(
      `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
    );
});

test('json format test with JSON objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.json`, `${__dirname}/../__fixtures__/nestedObject2.json`, 'json')).toEqual('[{"name":"common","value":[{"name":"follow","value":false,"type":"added"},{"name":"setting1","value":"Value 1","type":"unchanged"},{"name":"setting2","value":200,"type":"deleted"},{"name":"setting3","oldValue":true,"newValue":null,"type":"changed"},{"name":"setting4","value":"blah blah","type":"added"},{"name":"setting5","value":{"key5":"value5"},"type":"added"},{"name":"setting6","value":[{"name":"doge","value":[{"name":"wow","oldValue":"","newValue":"so much","type":"changed"}],"type":"nested"},{"name":"key","value":"value","type":"unchanged"},{"name":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"name":"group1","value":[{"name":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"name":"foo","value":"bar","type":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"nested"},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]');
});

test('json format test with YAML objects', () => {
  expect(genDiff(`${__dirname}/../__fixtures__/nestedObject1.yml`, `${__dirname}/../__fixtures__/nestedObject2.yml`, 'json')).toEqual('[{"name":"common","value":[{"name":"follow","value":false,"type":"added"},{"name":"setting1","value":"Value 1","type":"unchanged"},{"name":"setting2","value":200,"type":"deleted"},{"name":"setting3","oldValue":true,"newValue":null,"type":"changed"},{"name":"setting4","value":"blah blah","type":"added"},{"name":"setting5","value":{"key5":"value5"},"type":"added"},{"name":"setting6","value":[{"name":"doge","value":[{"name":"wow","oldValue":"","newValue":"so much","type":"changed"}],"type":"nested"},{"name":"key","value":"value","type":"unchanged"},{"name":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"name":"group1","value":[{"name":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"name":"foo","value":"bar","type":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"nested"},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]');
});
