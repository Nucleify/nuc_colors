<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-405');
uses()->group('user-color-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    apiTestArray([
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'user-colors.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'user-colors.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'user-colors.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'user-colors.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'user-colors.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
        ],
        'post > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'user-colors.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > show api' => [
            'method' => 'POST',
            'route' => 'user-colors.show',
            'status' => 405,
            'id' => 1,
        ],
        'put json > post api' => [
            'method' => 'PUT',
            'route' => 'user-colors.store',
            'status' => 405,
            'id' => 1,
        ],
        'delete json > post api' => [
            'method' => 'DELETE',
            'route' => 'user-colors.store',
            'status' => 405,
            'id' => 1,
        ],
        'post json > update api' => [
            'method' => 'POST',
            'route' => 'user-colors.update',
            'status' => 405,
            'id' => 1,
        ],
        'post > delete api' => [
            'method' => 'POST',
            'route' => 'user-colors.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > delete api' => [
            'method' => 'POST',
            'route' => 'user-colors.destroy',
            'status' => 405,
            'id' => 1,
        ],
    ]);
});
