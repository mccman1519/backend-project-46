/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
export default {
  stylish: `
{
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
}`,

  plain: `
Property 'common.follow' was added with value: false
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

  json: `
{
  "files": [
    "filePath1",
    "filePath2"
  ],
  "diffs": [
    {
      "path": "common.follow",
      "diff": {
        "type": "+",
        "value": false
      }
    },
    {
      "path": "common.setting2",
      "diff": {
        "type": "-"
      }
    },
    {
      "path": "common.setting3",
      "diff": {
        "type": "u",
        "value": null,
        "oldValue": true
      }
    },
    {
      "path": "common.setting4",
      "diff": {
        "type": "+",
        "value": "blah blah"
      }
    },
    {
      "path": "common.setting5",
      "diff": {
        "type": "+",
        "value": "{\n            \"key5\": \"value5\"\n          }"
      }
    },
    {
      "path": "common.setting6.doge.wow",
      "diff": {
        "type": "u",
        "value": "so much",
        "oldValue": ""
      }
    },
    {
      "path": "common.setting6.ops",
      "diff": {
        "type": "+",
        "value": "vops"
      }
    },
    {
      "path": "group1.baz",
      "diff": {
        "type": "u",
        "value": "bars",
        "oldValue": "bas"
      }
    },
    {
      "path": "group1.nest",
      "diff": {
        "type": "u",
        "value": "str",
        "oldValue": "{\n            \"key\": \"value\"\n          }"
      }
    },
    {
      "path": "group2",
      "diff": {
        "type": "-"
      }
    },
    {
      "path": "group3",
      "diff": {
        "type": "+",
        "value": "{\n            \"deep\": {\n              \"id\": {\n                \"number\": 45\n              }\n            },\n            \"fee\": 100500\n          }"
      }
    }
  ]
}`,
};
