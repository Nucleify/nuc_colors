<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-422');
uses()->group('user-color-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // USER ID TESTS
        'user_id > empty' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['user_id' => '']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],
        'user_id > string' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['user_id' => 'user_id']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > false' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['user_id' => false]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > empty array' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['user_id' => []]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],

        // NAME TESTS
        'name > empty' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['name' => '']),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],
        'name > integer' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['name' => 1]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > false' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['name' => false]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > true' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['name' => true]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > empty array' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['name' => []]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],

        // VALUE TESTS
        'value > empty' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['value' => '']),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],
        'value > integer' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['value' => 1]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > false' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['value' => false]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > true' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['value' => true]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > empty array' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['value' => []]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],

        // NEW TESTS
        'new > empty' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['new' => '']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
        'new > string' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['new' => 'not_a_boolean']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field must be true or false.']]],
        ],
        'new > empty array' => [
            'method' => 'POST',
            'route' => 'user-colors.store',
            'data' => array_merge(userColorData, ['new' => []]),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
    ]);
});
