# Nova Echo 

Adds Laravel Echo with your broadcast configuration to your Laravel Nova app.

## Installation

By using Nova Echo, we have a readily configured Laravel Echo instance in our JS.

 for broadcasting/receiving using PDM Pusher:
- [Pusher PDM](https://pusher.pdmfc.com)


You can find instructions about setting up broadcasting in Laravel using the [official documentation](https://laravel.com/docs/5.7/broadcasting).

Once you have this set up in your Nova app, you can install this package in composer.json

```php
"repositories": {
        {
            "type": "vcs",
            "url": "https://gitlab.pdmfc.com/pdm-laravel/nova-echo.git"
        }
},
"require": {
        "pdmfc/nova-echo": "*"
}
```

You will need to change 'pusher' broadcasting config.
```php
 'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => null,
            'app_id' => env('PUSHER_APP_ID'),
            'auth_endpoint' => env('PUSHER_AUTH_ENDPOINT', '/broadcasting/auth'),
            'options' => [
                'host' => env('PUSHER_HOST'),
                'schema' => 'https',
                'curl_options' => [
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_POSTREDIR => 3
                ]
            ],
        ],
```

changes in .env:

```dotenv
PUSHER_HOST=pusher.pdmfc.com
PUSHER_PORT=6001
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
MIX_PUSHER_HOST="${PUSHER_HOST}"
MIX_PUSHER_PORT="${PUSHER_PORT}"
MIX_PUSHER_SCHEME=https
```

You must generate the app_id and app_key in https://pusher.pdmfc.com.

You will then need to override Nova's `layout.blade.php`. Create a layout file `resources/views/vendor/nova/layout.blade.php` and copy the contents from `vendor/laravel/nova/resources/views/layout.blade.php`.

Include Nova Echo's blade file in the Nova layout. This blade file contains `meta` tags with your broadcast configuration.

```php
// file: resources/views/vendor/nova/layout.blade.php

<!DOCTYPE html>
<html lang="en" class="h-full font-sans antialiased">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1280">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  
  @include('pdmfc-nova-echo::meta') <!-- Include this line -->
  
  <title>
  ...
  
```

## Usage

Nova Echo instantiates `Echo` and makes it available throughout your Nova app. You can access your `Echo` object through

```js
window.Echo
```

By default, this `Echo` instance already subscribes to the logged in user's private channel, which by default would be the namespace of your app's user object, ie.

You can access and attach listeners to this user's private channel through

```js
window.userPrivateChannel
```

To authenticate the user through this channel, make sure you have your `BroadcastServiceProvider` available with `Broadcast::routes()` declared. You'll also need to define access through your `route/channels.php` file, ie:

```php
// file: routes/channels.php

Broadcast::channel(config('broadcasting.connections.pusher.app_id').'-users.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id;
});
```

You can override the `receivesBroadcastNotificationsOn` to use a different channel name.

```php
class User extends Authenticatable
{
    use Notifiable;
    
    ...
    
    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return config('broadcasting.connections.pusher.app_id').'-users.' . $this->id;
    }
}
```


## Credits

- [Chris Bautista](https://github.com/chrisbjr)
- [CoreProc](https://github.com/coreproc)


## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
