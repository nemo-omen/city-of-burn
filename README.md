# City of Burn

## API Routes

`/demo` - Unguarded ws connection that initializes a mini-game, allowing the user to experience their initial entrance into the city before creating an account and character.

`/game` - The game proper - guarded - ws connection that requires credentials before upgrading connection

`/auth/{verb}` 
  - `{register}` - Registration
  - `{login}` - Login
  - `{verify(?)}` - no idea if this is needed, but I'm guessing we'll need a toute to verify credentials, though this is probably just a middleware