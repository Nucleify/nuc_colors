<?php

namespace App\Observers;

use App\Models\SystemColor;
use App\Models\User;
use App\Models\UserColor;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
    public function created(User $user): void
    {
        $skipColors = Cache::get('skip_colors', false);

        if ($skipColors) {
            return;
        }

        $systemColors = SystemColor::all();

        foreach ($systemColors as $systemColor) {
            $name = str_replace('-system', '-user', $systemColor->getName());

            UserColor::create([
                'user_id' => $user->getId(),
                'name' => $name,
                'value' => $systemColor->getValue(),
                'new' => false,
            ]);
        }
    }
}
