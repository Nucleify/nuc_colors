<?php

namespace Database\Seeders;

use App\Models\SystemColor;
use Illuminate\Database\Seeder;

class SystemColorSeeder extends Seeder
{
    protected string $path = __DIR__ . '/../constants/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = include $this->path . 'Colors.php';

        foreach ($colors as $color) {
            $name = $color['name'];
            $name = preg_replace('/-new$/', '', $name);
            $name = str_replace('', '', $name);
            $name = $name . '-system';

            SystemColor::factory()->create([
                'name' => $name,
                'value' => $color['value'],
                'new' => false,
            ]);
        }
    }
}
