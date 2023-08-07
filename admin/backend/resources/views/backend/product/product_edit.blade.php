@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="page-wrapper">
  <div class="page-content">

        <!-- Breadcrumb -->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Readbooksmore.com</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Book Details</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!-- End breadcrumb -->

      <div class="card">
        <div class="card-body p-4">
            <h5 class="card-title">Edit Book Details</h5>
            <hr>
            <div class="form-body mt-4">

              <form method="post" action="{{ route('product.update') }}" enctype="multipart/form-data">
              @csrf
              <input type="hidden" name="id" value="{{ $product->id }}">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="border border-3 p-4 rounded">

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Book Title</label>
                                        <input type="text" name="title" value ="{{$product->title}}" class="form-control" id="inputProductTitle" placeholder="Enter product title">
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">ISBN</label>
                                        <input type="text" name="ISBN" value ="{{$product->ISBN}}" class="form-control" id="inputProductTitle" placeholder="Enter product title">
                                    </div>

                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Book Image</label>
                                        <input class="form-control" name="image" type="file" id="image">
                                    </div>

                                    <div class="mb-3">
                                        <img id="showImage" src="{{ asset($product->image)  }}" style="width:100px; height: 100px;">
                                    </div>
                                    @foreach($details as $item)
                                    <div class="mb-3">
                                        <label for="inputProductDescription" class="form-label">Description</label>
                                         <textarea id="mytextarea" name="description" style="height: 200px; width: 600px;">{{$item->description}}</textarea>
                                        </div>
                                    @endforeach
                                    <div class="mb-3">
                                        <label for="inputPrice" class="form-label">Shipping Details</label>
                                        <input type="text" name="shipping_details" class="form-control" id="inputShippingDetails" value="2-3 days Standard delivery. 1 day Express Delivery" readonly />
                                    </div>
                                  </div>
                              </div>
                        
                          <div class="col-lg-4">
                              <div class="border border-3 p-4 rounded">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="inputPrice" class="form-label">Price</label>
                                        <input type="text" name="price" value ="{{$product->price}}" class="form-control" id="inputPrice" placeholder="00.00">
                                    </div>

                                    <div class="col-md-6">
                                        <label for="inputCompareatprice" class="form-label">Quantity</label>
                                        <input type="text" name="quantity" value ="{{$product->quantity}}" class="form-control" id="inputCompareatprice" >
                                    </div>

                                    <div class="col-12">
                                        <label for="inputProductType" class="form-label">Book Status</label>
                                        <select name="book_status" class="form-select" id="inputProductType">
                                        <option selected="">{{$product->book_status}}</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <label for="inputProductType" class="form-label"> Genre</label>
                                        <select name="category" class="form-select" id="inputProductType">
                                            <option selected="">Select Genre</option>
                                            @foreach($category as $item)
						                                <option value="{{ $item->category_name }}" {{ $item->category_name == $product->category ? 'selected': '' }} > {{ $item->category_name }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-group mg-b-10-force">
                                            <label class="form-control-label">Sub Genre</label>
                                            <select class="form-control select2" name="subcategory_name" data-placeholder="Choose Sub Category">
                                                <!-- get list of subcategories while selecting category -->
                                                 @foreach ($subcategory as $sub)
                                                <option value="{{ $sub->subcategory_name }}" {{ $sub->subcategory_name == $product->subcategory ? 'selected' : '' }}>
                                                {{ $sub->subcategory_name }}
                                                </option>
                                                 @endforeach
                                              </select>
                                        </div>
                                    </div>
                                    <input type="hidden" name="subcategory" value="">

                                    <script type="text/javascript">
                                        $(document).ready(function () {
                                            $('select[name="category"]').on('change', function () {
                                                var category_name = $(this).val();
                                                if (category_name) {
                                                    $.ajax({
                                                        url: "{{ url('/product/get/subcategory/') }}/" + category_name,
                                                        type: "GET",
                                                        dataType: "json",
                                                        success: function (data) {
                                                            var subcategorySelect = $('select[name="subcategory_name"]');
                                                            subcategorySelect.empty();
                                                            $.each(data, function (key, value) {
                                                                subcategorySelect.append('<option value="' + value.subcategory_name + '">' + value.subcategory_name + '</option>');
                                                            });
                                                        },
                                                    });
                                                } else {
                                                    alert('danger');
                                                }
                                            });

                                            // Update the hidden input field value on subcategory selection
                                            $('select[name="subcategory_name"]').on('change', function () {
                                                var selectedSubcategory = $(this).val();
                                                $('input[name="subcategory_name"]').val(selectedSubcategory);
                                            });
                                        });
                                    </script>

                                    <div class="col-12">
                                        <label for="inputProductType" class="form-label">Author</label>
                                        <select name="author" class="form-select" id="inputProductType">
                                            <option selected="">Select Author</option>
                                            @foreach($author as $item)
                                            <option value="{{ $item->authors_name }}" {{ $item->authors_name == $product->author ? 'selected' : '' }}>
                                            {{ $item->authors_name }}
                                            </option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <label for="inputRentalPeriod" class="form-label">Rental Period</label>
                                        <input type="number" name="period" class="form-control" id="inputRentalPeriod" value="10" readonly>
                                    </div>

                                    <div class="col-12">
                                        <label for="inputProductType" class="form-label">Remarks</label>
                                        <select name="remark" class="form-select" id="inputProductType">
                                        <option selected="">{{$product->remark}}</option>
                                            <option value="BEST">BEST</option>
                                            <option value="NEW">NEW</option>
                                            <option value="">No Remark</option>
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary">Save Book Details</button>
                                        </div>
                                    </div>
                                </div>
                              </div>
                           </div>      
                       </form>
                    </div>
                 </div>
              </div>
          </div>
      </div>
      

<script type="text/javascript">
    $(document).ready(function(){
        $('#image').change(function(e){
            var reader = new FileReader();
            reader.onload = function(e){
                $('#showImage').attr('src',e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });
    });
</script>

<script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js' referrerpolicy="origin"></script>

</script>

@endsection
