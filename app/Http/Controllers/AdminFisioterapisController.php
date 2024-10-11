<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Fisioterapis;
use Carbon\Carbon;

class AdminFisioterapisController extends Controller
{
    public function index()
    {
        $fisioterapis = Fisioterapis::whereNull('queue_number_id')
                                    ->whereNull('late_queue_number')
                                    ->latest()
                                    ->paginate(10);

        return view('admin.fisioterapis.index', [
            'app' => Application::all(),
            'title' => 'Data Fisioterapis',
            'fisioterapis' => $fisioterapis
        ]);
    }

    public function filter(Request $request)
    {
        $validated = $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'nullable|date|after_or_equal:startDate'
        ]);

        $startDate = Carbon::parse($validated['startDate']);
        $endDate = isset($validated['endDate']) ? Carbon::parse($validated['endDate'])->endOfDay() : Carbon::now();

        $fisioterapis = Fisioterapis::whereNull('queue_number_id')
                                    ->whereNull('late_queue_number')
                                    ->whereBetween('created_at', [$startDate, $endDate])
                                    ->latest()
                                    ->paginate(10);

        return view('admin.fisioterapis.index', [
            'app' => Application::all(),
            'title' => 'Data Fisioterapis',
            'fisioterapis' => $fisioterapis
        ]);
    }

    public function deleteFisioterapis(Request $request)
    {
        try {
            $idFisioterapis = decrypt($request->codeFisioterapis);
            Fisioterapis::destroy($idFisioterapis);
            return back()->with('deleteFisioterapisSuccess', 'Fisioterapis berhasil dihapus!');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menghapus fisioterapis.');
        }
    }

    public function editFisioterapis(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'gender' => 'required|in:Laki-Laki,Perempuan'
        ]);

        try {
            $idFisioterapis = decrypt($request->code);
            Fisioterapis::where('id', $idFisioterapis)->update($validatedData);
            return back()->with('editFisioterapisSuccess', 'Data fisioterapis berhasil diupdate!');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat mengedit fisioterapis.');
        }
    }

    public function search(Request $request)
    {
        $query = $request->validate([
            'q' => 'required|string|max:255'
        ])['q'];

        $fisioterapis = Fisioterapis::whereNull('queue_number_id')
                                    ->whereNull('late_queue_number')
                                    ->where(function($q) use ($query) {
                                        $q->where('name', 'like', '%' . $query . '%')
                                          ->orWhere('status', 'like', '%' . $query . '%');
                                    })
                                    ->latest()
                                    ->paginate(10);

        return view('admin.fisioterapis.search', [
            'app' => Application::all(),
            'title' => 'Data Fisioterapis',
            'fisioterapis' => $fisioterapis
        ]);
    }
}
