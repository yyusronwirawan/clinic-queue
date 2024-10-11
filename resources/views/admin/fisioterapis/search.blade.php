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
<div class="flash-message" data-edit-fisioterapis="@if(session()->has('editFisioterapisSuccess')) {{ session('editFisioterapisSuccess') }} @endif" data-delete-fisioterapis="@if(session()->has('deleteFisioterapisSuccess')) {{ session('deleteFisioterapisSuccess') }} @endif"></div>
<div class="edit-error-validate" data-error-name="@error('name') {{ $message }} @enderror" data-error-gender="@error('gender') {{ $message }} @enderror"></div>
<div class="row">
  <div class="col-md-12 col-lg-12 order-2 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between" style="margin-bottom: -0.7rem;">
        <div class="justify-content-end">
          <!-- Search -->
          <form action="/admin/fisioterapis/search">
            <div class="input-group">
              <input type="search" class="form-control" name="q" id="search" style="border: 1px solid #d9dee3;" value="{{ request('q') }}" placeholder="Cari data fisioterapis..." autocomplete="off" />
            </div>
          </form>
          <!-- /Search -->
        </div>
      </div>
      <div class="card-body">
        <ul class="p-0 m-0">
          <div class="table-responsive text-nowrap" style="border-radius: 3px;">
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th class="text-white">No</th>
                  <th class="text-white">Nama Lengkap</th>
                  <th class="text-white">Jenis Kelamin</th>
                  <th class="text-white">Dibuat pada tanggal</th>
                  <th class="text-white">Diedit pada tanggal</th>
                  <th class="text-white text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                @foreach($fisioterapis as $index => $fisioterapi)
                <tr>
                  <td>{{ $fisioterapis->firstItem() + $index }}</td>
                  <td>{{ $fisioterapi->name }}</td>
                  <td>@if($fisioterapi->gender == 'Laki-Laki')<span class="badge bg-label-primary fw-bold">Laki-Laki</span>@else<span class="badge fw-bold" style="color: #ff6384 !important; background-color: #ffe5eb !important;">Perempuan</span>@endif</td>
                  <td>{{ $fisioterapi->created_at->locale('id')->isoFormat('D MMMM YYYY | H:mm') }}</td>
                  <td>{{ $fisioterapi->updated_at->locale('id')->isoFormat('D MMMM YYYY | H:mm') }}</td>
                  <td class="text-center">
                    <button type="button" class="btn btn-icon btn-primary btn-sm buttonEditFisioterapis" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Edit Data Fisioterapis" data-code="{{ encrypt($fisioterapi->id) }}" data-name="{{ $fisioterapi->name }}" data-gender="{{ $fisioterapi->gender }}">
                      <span class="tf-icons bx bx-edit" style="font-size: 15px;"></span>
                    </button>
                    <button type="button" class="btn btn-icon btn-danger btn-sm buttonDeleteFisioterapis" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Delete Fisioterapis" data-code="{{ encrypt($fisioterapi->id) }}" data-name="{{ $fisioterapi->name }}">
                      <span class="tf-icons bx bx-trash" style="font-size: 14px;"></span>
                    </button>
                  </td>
                </tr>
                @endforeach
                @if($fisioterapis->isEmpty())
                <tr>
                  <td colspan="100" class="text-center">Data fisioterapis tidak ditemukan dengan keyword pencarian: <b>"{{request('q')}}"</b></td>
                </tr>
                @endif
              </tbody>
            </table>
          </div>
        </ul>

        @if(!$fisioterapis->isEmpty())
        <div class="mt-3 pagination-mobile">{{ $fisioterapis->withQueryString()->onEachSide(1)->links() }}</div>
        @endif
      </div>
    </div>
  </div>
</div>

<!-- Modal Delete Fisioterapis -->
<div class="modal fade" id="deleteFisioterapis" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form action="/admin/fisioterapis/delete" method="post" id="formDeleteFisioterapis">
      <input type="hidden" name="codeFisioterapis" id="codeDeleteFisioterapis">
      @csrf
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title text-primary fw-bold">Konfirmasi&nbsp;<i class='bx bx-check-shield fs-5' style="margin-bottom: 3px;"></i></h5>
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-dismiss="modal"><i class="bx bx-x-circle text-danger fs-4" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Tutup"></i></button>
        </div>
        <div class="modal-body" style="margin-top: -10px;">
          <div class="col-sm fs-6 namaFisioterapisDelete"></div>
        </div>
        <div class="modal-footer" style="margin-top: -5px;">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><i class='bx bx-share fs-6' style="margin-bottom: 3px;"></i>&nbsp;Tidak</button>
          <button type="submit" class="btn btn-primary"><i class='bx bx-trash fs-6' style="margin-bottom: 3px;"></i>&nbsp;Ya, Hapus!</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- formModalAdminEditFisioterapis -->
<div class="modal fade" id="formModalAdminEditFisioterapis" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form action="/admin/fisioterapis/edit" method="post" class="modalAdminEditFisioterapis">
      @csrf
      <input type="hidden" name='code' value="{{ old('code') }}" id="codeEditFisioterapis">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title text-primary fw-bold">Edit Data Fisioterapis&nbsp;<i class='bx bx-user fs-5' style="margin-bottom: 1px;"></i></h5>
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow cancelModalEditFisioterapis" data-bs-dismiss="modal"><i class="bx bx-x-circle text-danger fs-4" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="auto" title="Tutup"></i></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col mb-2 mb-lg-3">
              <label for="nama_lengkap_fisioterapis" class="form-label required-label">Nama Lengkap</label>
              <input type="text" id="nama_lengkap_fisioterapis" name="name" value="{{ old('name') }}" class="form-control @error('name') is-invalid @enderror" placeholder="Masukkan nama fisioterapis" autocomplete="off" required>
              @error('name')
              <div class="invalid-feedback" style="margin-bottom: -3px;">
                {{ $message }}
              </div>
              @enderror
            </div>
          </div>
          <div class="row g-2">
            <div class="col">
              <label for="gender_fisioterapis" class="form-label required-label">Jenis Kelamin</label>
              <select class="form-select @error('gender') is-invalid @enderror" name="gender" id="gender_fisioterapis" style="cursor: pointer;" required>
                <option value="" disabled selected>Pilih Jenis Kelamin</option>
                <option id="laki-laki" @if(old('gender')=='Laki-Laki' ) selected @endif value="Laki-Laki">Laki-Laki</option>
                <option id="perempuan" @if(old('gender')=='Perempuan' ) selected @endif value="Perempuan">Perempuan</option>
              </select>
              @error('gender')
              <div class="invalid-feedback" style="margin-bottom: -10px;">
                {{ $message }}
              </div>
              @enderror
            </div>
          </div>
        </div>
        <div class="modal-footer mt-2">
          <button type="submit" class="btn btn-primary"><i class='bx bx-edit-alt fs-6' style="margin-bottom: 3px;"></i>&nbsp;Simpan Perubahan!</button>
        </div>
      </div>
    </form>
  </div>
</div>
@endsection
