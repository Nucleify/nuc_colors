<?php

namespace App\Observers;

use App\Models\SystemColor;
use App\Models\User;
use App\Models\UserColor;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
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
