<?php

namespace App\Http\Controllers;

class HealthController extends Controller {
	public function healthCheck() {
		return response()->json([ "ok" => true ]);
	}
}
