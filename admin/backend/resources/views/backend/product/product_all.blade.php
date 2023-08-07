@extends('admin.admin_master') @section('admin')

<div class="page-wrapper">
  <div class="page-content">
    <div class="card radius-10">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div>
            <h5 class="mb-0">All Product</h5>
          </div>
          <div class="font-22 ms-auto">
            <i class="bx bx-dots-horizontal-rounded"></i>
          </div>
        </div>
        <hr />
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Book</th>
                <th> ISBN</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              @php($i = 1) @foreach($products as $item)
              <tr>
                <td>{{ $i++ }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="recent-product-img">
                      <img src=" {{ $item->image }} " alt="" />
                    </div>
                  </div>
                </td>

                <td>{{ $item->title }}</td>
                <td>{{ $item->ISBN }}</td>
                <td>{{ $item->category }}</td>
                <td>{{ $item->subcategory }}</td>

                <td>
                  <a
                    href="{{ route('product.edit',$item->id) }}"
                    class="btn btn-info"
                    >Edit
                  </a>
                 
                </td>
              </tr>
              @endforeach
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {{ $products->links('vendor.pagination.custom') }}
  </div>
</div>

@endsection
