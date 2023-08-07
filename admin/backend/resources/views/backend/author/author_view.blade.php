@extends('admin.admin_master')
@section('admin')
 

<div class="page-wrapper">
			<div class="page-content">
			 
				 

<div class="card radius-10">
						<div class="card-body">
							<div class="d-flex align-items-center">
	<div>
		<h5 class="mb-0">All Category </h5>
	</div>
	<div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
	</div>
</div>
<hr>
<div class="table-responsive">
	<table class="table align-middle mb-0">
		<thead class="table-light">
			<tr>
				<th>SL</th>
				<th>Author Image </th>
				<th>Author Name </th>				 
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			@php($i = 1)
			@foreach($author as $item)
			<tr>
				<td>{{ $i++ }}</td>
				<td>
					<div class="d-flex align-items-center">
						<div class="recent-product-img">
							<img src=" {{ $item->authors_img }} " alt="">
						</div>
						 
					</div>
				</td>


		 <td>{{ $item->authors_name }}</td>		 
				 
				<td>
	<a href="{{ route('author.edit',$item->id) }}" class="btn btn-info" >Edit </a>	
	<a href="{{ route('author.delete',$item->id) }}" class="btn btn-danger" id="delete" >Delete </a>				
					 
				</td>
			</tr>
			@endforeach
			 
		</tbody>
	</table>
</div>
						</div>
					</div>




			</div>
		</div>
 
@endsection