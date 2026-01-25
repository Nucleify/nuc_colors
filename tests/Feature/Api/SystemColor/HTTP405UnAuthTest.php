<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-405');
uses()->group('system-color-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    apiTestArray([
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'system-colors.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'system-colors.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'system-colors.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'system-colors.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'system-colors.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
        ],
        'post > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'system-colors.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > show api' => [
            'method' => 'POST',
            'route' => 'system-colors.show',
            'status' => 405,
            'id' => 1,
        ],
        'put json > post api' => [
            'method' => 'PUT',
            'route' => 'system-colors.store',
            'status' => 405,
            'id' => 1,
        ],
        'delete json > post api' => [
            'method' => 'DELETE',
            'route' => 'system-colors.store',
            'status' => 405,
            'id' => 1,
        ],
        'post json > update api' => [
            'method' => 'POST',
            'route' => 'system-colors.update',
            'status' => 405,
            'id' => 1,
        ],
        'post > delete api' => [
            'method' => 'POST',
            'route' => 'system-colors.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > delete api' => [
            'method' => 'POST',
            'route' => 'system-colors.destroy',
            'status' => 405,
            'id' => 1,
        ],
    ]);
});
