<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GridController extends Controller {
	public function getGrid($id) {
		$grid = DB::table("grids")->select("data")->where("id", $id)->first();
		abort_if(is_null($grid), 404, "Grid not found");
		$data = json_decode($grid->data);
		$data->id = $id;
		return response()->json($data);
	}

	public function setGrid(Request $request, $id) {
		$data = $request->post();
		abort_if(is_null($data), 400, "Missing grid content");
		unset($data["id"]);
		DB::table("grids")->updateOrInsert(compact("id"), [ "data" => json_encode($data) ]);
		return response()->noContent();
	}
}
