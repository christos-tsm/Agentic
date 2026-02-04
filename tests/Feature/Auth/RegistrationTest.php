<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    // Create the role first
    \Spatie\Permission\Models\Role::create(['name' => 'employee']);

    // Then create the invitation
    $invitation = \App\Models\Invitation::create([
        'email' => 'test@example.com',
        'invitation_token' => \Illuminate\Support\Str::random(32),
        'role' => 'employee',
        'expires_at' => now()->addDays(7),
    ]);

    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'invitation_token' => $invitation->invitation_token,
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    // Assert invitation was marked as used
    expect($invitation->fresh()->registered_at)->not->toBeNull();

    // Assert user has the correct role
    $user = \App\Models\User::where('email', 'test@example.com')->first();
    expect($user->hasRole('employee'))->toBeTrue();
});
