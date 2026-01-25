<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-422');
uses()->group('user-color-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function (): void {
    apiTestArray([
        // USER ID TESTS
        'user_id > empty' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['user_id' => '']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > string' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['user_id' => 'user_id']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > false' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['user_id' => false]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > empty array' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['user_id' => []]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],

        // NAME TESTS
        'name > empty' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['name' => '']),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],
        'name > integer' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['name' => 1]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > false' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['name' => false]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > true' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['name' => true]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > empty array' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['name' => []]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],

        // VALUE TESTS
        'value > empty' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['value' => '']),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],
        'value > integer' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['value' => 1]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > false' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['value' => false]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > true' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['value' => true]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > empty array' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['value' => []]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],

        // NEW TESTS
        'new > empty' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['new' => '']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
        'new > string' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['new' => 'not_a_boolean']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field must be true or false.']]],
        ],
        'new > empty array' => [
            'method' => 'PUT',
            'route' => 'user-colors.update',
            'id' => 1,
            'data' => array_merge(updatedUserColorData, ['new' => []]),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
    ]);
});
