<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-422');
uses()->group('system-color-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function (): void {
    apiTestArray([
        // NAME TESTS
        'name > empty' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['name' => '']),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],
        'name > integer' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['name' => 1]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > false' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['name' => false]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > true' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['name' => true]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > empty array' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['name' => []]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],

        // VALUE TESTS
        'value > empty' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['value' => '']),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],
        'value > integer' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['value' => 1]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > false' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['value' => false]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > true' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['value' => true]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > empty array' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['value' => []]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],

        // NEW TESTS
        'new > empty' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['new' => '']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
        'new > string' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['new' => 'not_a_boolean']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field must be true or false.']]],
        ],
        'new > empty array' => [
            'method' => 'PUT',
            'route' => 'system-colors.update',
            'id' => 1,
            'data' => array_merge(updatedSystemColorData, ['new' => []]),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
    ]);
});
