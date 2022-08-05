// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: { username: string; };
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	interface Session {
		user?: { username: string; };
	}
	// interface Stuff {}
}
