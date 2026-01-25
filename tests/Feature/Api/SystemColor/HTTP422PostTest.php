<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-422');
uses()->group('system-color-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // NAME TESTS
        'name > empty' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['name' => '']),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],
        'name > integer' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['name' => 1]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > false' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['name' => false]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > true' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['name' => true]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field must be a string.']]],
        ],
        'name > empty array' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['name' => []]),
            'structure' => ['errors' => ['name']],
            'fragment' => ['errors' => ['name' => ['The name field is required.']]],
        ],

        // VALUE TESTS
        'value > empty' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['value' => '']),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],
        'value > integer' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['value' => 1]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > false' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['value' => false]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > true' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['value' => true]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field must be a string.']]],
        ],
        'value > empty array' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['value' => []]),
            'structure' => ['errors' => ['value']],
            'fragment' => ['errors' => ['value' => ['The value field is required.']]],
        ],

        // NEW TESTS
        'new > empty' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['new' => '']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
        'new > string' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['new' => 'not_a_boolean']),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field must be true or false.']]],
        ],
        'new > empty array' => [
            'method' => 'POST',
            'route' => 'system-colors.store',
            'data' => array_merge(systemColorData, ['new' => []]),
            'structure' => ['errors' => ['new']],
            'fragment' => ['errors' => ['new' => ['The new field is required.']]],
        ],
    ]);
});
