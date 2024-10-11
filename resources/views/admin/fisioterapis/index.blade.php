@extends('layouts.main.index')

@section('container')
<style>
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1320px) {
    #search {
      width: 250px;
    }
  }

  @media screen and (max-width: 575px) {
    .pagination-mobile {
      display: flex;
      justify-content: end;
    }
  }
</style>

<!-- Flash Messages -->
<div class="flash-message" 
  data-edit-physiotherapist="{{ session('editFisioterapisSuccess') ?? '' }}"
  data-delete-physiotherapist="{{ session('deleteFisioterapisSuccess') ?? '' }}">
</div>

<div class="edit-error-validate" 
  data-error-name="@error('name') {{ $message }} @enderror" 
  data-error-status="@error('status') {{ $message }} @enderror" 
  data-error-gender="@error('gender') {{ $message }} @enderror">
</div>

<!-- Table Section -->
<div class="row">
  <div class="col-md-12 col-lg-12 order-2 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between" style="margin-bottom: -0.7rem;">
        <div class="d-flex justify-content-start align-items-center">
          <!-- Add Physiotherapist Button -->
          <button type="button" class="btn btn-xs btn-dark fw-bold p-2 buttonAddPhysiotherapist" data-bs-toggle="modal" data-bs-target="#formModalAdminAddPhysiotherapist">
            <i class='bx bx-user-plus fs-6'></i>&nbsp;TAMBAH FISIOTERAPIS
          </button>
        </div>
        <div class="d-flex justify-content-end">
          <form action="{{ route('fisioterapis.search') }}" method="get" class="d-flex align-items-center">
            <label for="search" class="visually-hidden">Cari fisioterapis</label>
            <input type="search" class="form-control me-2" name="q" id="search" 
              value="{{ request('q') }}" placeholder="Cari data fisioterapis..." autocomplete="off" />
          </form>
        </div>
      </div>

      <div class="card-body">
        <div class="table-responsive text-nowrap" style="border-radius: 3px;">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr>
                <th class="text-white">No</th>
                <th class="text-white">Nama Lengkap</th>
                <th class="text-white">Status</th>
                <th class="text-white">Jenis Kelamin</th>
                <th class="text-white">Dibuat pada Tanggal</th>
                <th class="text-white">Diedit pada Tanggal</th>
                <th class="text-white text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              @foreach($fisioterapis as $index => $physiotherapist)
              <tr>
                <td>{{ $fisioterapis->firstItem() + $index }}</td>
                <td>{{ $physiotherapist->name }}</td>
                <td>
                  <span class="badge {{ $physiotherapist->status == 'Aktif' ? 'bg-label-success' : 'bg-label-danger' }}">
                    {{ $physiotherapist->status }}
                  </span>
                </td>
                <td>
                  <span class="badge {{ $physiotherapist->gender == 'Laki-Laki' ? 'bg-label-primary' : 'bg-label-danger' }}">
                    {{ $physiotherapist->gender }}
                  </span>
                </td>
                <td>{{ $physiotherapist->created_at->locale('id')->isoFormat('D MMMM YYYY | H:mm') }}</td>
                <td>{{ $physiotherapist->updated_at->locale('id')->isoFormat('D MMMM YYYY | H:mm') }}</td>
                <td class="text-center">
                  <button type="button" class="btn btn-icon btn-primary btn-sm buttonEditPhysiotherapist" 
                    data-bs-toggle="tooltip" title="Edit Data" 
                    data-code="{{ encrypt($physiotherapist->id) }}" 
                    data-name="{{ $physiotherapist->name }}" 
                    data-status="{{ $physiotherapist->status }}" 
                    data-gender="{{ $physiotherapist->gender }}">
                    <i class="tf-icons bx bx-edit"></i>
                  </button>
                  <button type="button" class="btn btn-icon btn-danger btn-sm buttonDeletePhysiotherapist" 
                    data-bs-toggle="tooltip" title="Hapus Fisioterapis" 
                    data-code="{{ encrypt($physiotherapist->id) }}" 
                    data-name="{{ $physiotherapist->name }}">
                    <i class="tf-icons bx bx-trash"></i>
                  </button>
                </td>
              </tr>
              @endforeach
              
              @if($fisioterapis->isEmpty())
              <tr>
                <td colspan="7" class="text-center">Data fisioterapis tidak ditemukan!</td>
              </tr>
              @endif
            </tbody>
          </table>
        </div>
        
        @if(!$fisioterapis->isEmpty())
        <div class="mt-3 pagination-mobile">
          {{ $fisioterapis->withQueryString()->onEachSide(1)->links() }}
        </div>
        @endif
      </div>
    </div>
  </div>
</div>

<!-- Modal Delete Physiotherapist -->
<div class="modal fade" id="deletePhysiotherapist" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form action="/admin/fisioterapis/delete" method="post" id="formDeletePhysiotherapist">
      <input type="hidden" name="codePhysiotherapist" id="codeDeletePhysiotherapist">
      @csrf
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title text-primary fw-bold">Konfirmasi&nbsp;<i class='bx bx-check-shield fs-5' style="margin-bottom: 3px;"></i></h5>
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-dismiss="modal"><i class="bx bx-x-circle text-danger fs-4" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Tutup"></i></button>
        </div>
        <div class="modal-body" style="margin-top: -10px;">
          <div class="col-sm fs-6 namaPhysiotherapistDelete"></div>
        </div>
        <div class="modal-footer" style="margin-top: -5px;">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><i class='bx bx-share fs-6' style="margin-bottom: 3px;"></i>&nbsp;Tidak</button>
          <button type="submit" class="btn btn-primary"><i class='bx bx-trash fs-6' style="margin-bottom: 3px;"></i>&nbsp;Ya, Hapus!</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- Modal Edit Physiotherapist -->
<div class="modal fade" id="formModalAdminEditPhysiotherapist" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form action="/admin/fisioterapis/edit" method="post" class="modalAdminEditPhysiotherapist">
      @csrf
      <input type="hidden" name='code' value="{{ old('code') }}" id="codeEditPhysiotherapist">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title text-primary fw-bold">Edit Data Fisioterapis&nbsp;<i class='bx bx-user fs-5' style="margin-bottom: 1px;"></i></h5>
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow cancelModalEditPhysiotherapist" data-bs-dismiss="modal"><i class="bx bx-x-circle text-danger fs-4" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Tutup"></i></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label">Nama Lengkap</label>
            <input type="text" class="form-control" id="nameEditPhysiotherapist" name="name" value="{{ old('name') }}" required>
            @error('name')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-select" id="statusEditPhysiotherapist" name="status" required>
              <option value="" disabled selected>Pilih Status</option>
              <option value="Aktif" {{ old('status') == 'Aktif' ? 'selected' : '' }}>Aktif</option>
              <option value="Tidak Aktif" {{ old('status') == 'Tidak Aktif' ? 'selected' : '' }}>Tidak Aktif</option>
            </select>
            @error('status')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Jenis Kelamin</label>
            <select class="form-select" id="genderEditPhysiotherapist" name="gender" required>
              <option value="" disabled selected>Pilih Jenis Kelamin</option>
              <option value="Laki-Laki" {{ old('gender') == 'Laki-Laki' ? 'selected' : '' }}>Laki-Laki</option>
              <option value="Perempuan" {{ old('gender') == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
            </select>
            @error('gender')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger cancelModalEditPhysiotherapist" data-bs-dismiss="modal"><i class='bx bx-share fs-6' style="margin-bottom: 3px;"></i>&nbsp;Tutup</button>
          <button type="submit" class="btn btn-primary"><i class='bx bx-edit fs-6' style="margin-bottom: 3px;"></i>&nbsp;Simpan Perubahan</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- Modal Add Physiotherapist -->
<div class="modal fade" id="formModalAdminAddPhysiotherapist" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form action="/admin/fisioterapis/add" method="post" class="modalAdminAddPhysiotherapist">
      @csrf
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title text-primary fw-bold">Tambah Data Fisioterapis&nbsp;<i class='bx bx-user-plus fs-5' style="margin-bottom: 1px;"></i></h5>
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow cancelModalAddPhysiotherapist" data-bs-dismiss="modal"><i class="bx bx-x-circle text-danger fs-4" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Tutup"></i></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label">Nama Lengkap</label>
            <input type="text" class="form-control" id="nameAddPhysiotherapist" name="name" value="{{ old('name') }}" required>
            @error('name')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-select" id="statusAddPhysiotherapist" name="status" required>
              <option value="" disabled selected>Pilih Status</option>
              <option value="Aktif" {{ old('status') == 'Aktif' ? 'selected' : '' }}>Aktif</option>
              <option value="Tidak Aktif" {{ old('status') == 'Tidak Aktif' ? 'selected' : '' }}>Tidak Aktif</option>
            </select>
            @error('status')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Jenis Kelamin</label>
            <select class="form-select" id="genderAddPhysiotherapist" name="gender" required>
              <option value="" disabled selected>Pilih Jenis Kelamin</option>
              <option value="Laki-Laki" {{ old('gender') == 'Laki-Laki' ? 'selected' : '' }}>Laki-Laki</option>
              <option value="Perempuan" {{ old('gender') == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
            </select>
            @error('gender')
              <div class="text-danger small mt-1">{{ $message }}</div>
            @enderror
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger cancelModalAddPhysiotherapist" data-bs-dismiss="modal"><i class='bx bx-share fs-6' style="margin-bottom: 3px;"></i>&nbsp;Tutup</button>
          <button type="submit" class="btn btn-primary"><i class='bx bx-user-plus fs-6' style="margin-bottom: 3px;"></i>&nbsp;Simpan Data</button>
        </div>
      </div>
    </form>
  </div>
</div>

@endsection
