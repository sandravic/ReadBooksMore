@extends('admin.admin_master')
@section('admin')

<div class="page-wrapper">
			<div class="page-content">

					<div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
						<div class="col">
							<div class="card radius-10 bg-gradient-deepblue">
							 <div class="card-body">
								<div class="d-flex align-items-center">
									<h5 class="mb-0 text-white">{{ $torder }} </h5>
									<div class="ms-auto">
                                        <i class='bx bx-cart fs-3 text-white'></i>
									</div>
								</div>
								<div class="progress my-3 bg-light-transparent" style="height:3px;">
									<div class="progress-bar bg-white" role="progressbar" style="width: 55%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div class="d-flex align-items-center text-white">
									<p class="mb-0">Total Orders</p>
								</div>
							</div>
						  </div>
						</div>
						<div class="col">
							<div class="card radius-10 bg-gradient-orange">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<h5 class="mb-0 text-white">{{ $treturn }} </h5>
									<div class="ms-auto">
                                        <i class='bx bx-dollar fs-3 text-white'></i>
									</div>
								</div>
								<div class="progress my-3 bg-light-transparent" style="height:3px;">
									<div class="progress-bar bg-white" role="progressbar" style="width: 55%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div class="d-flex align-items-center text-white">
									<p class="mb-0">Total Return</p>
								</div>
							</div>
						  </div>
						</div>
						<div class="col">
							<div class="card radius-10 bg-gradient-ohhappiness">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<h5 class="mb-0 text-white">{{ $tvisitor }} </h5>
									<div class="ms-auto">
                                        <i class='bx bx-group fs-3 text-white'></i>
									</div>
								</div>
								<div class="progress my-3 bg-light-transparent" style="height:3px;">
									<div class="progress-bar bg-white" role="progressbar" style="width: 55%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div class="d-flex align-items-center text-white">
									<p class="mb-0">Visitors</p>
								</div>
							</div>
						</div>
						</div>
						<div class="col">
							<div class="card radius-10 bg-gradient-ibiza">
							 <div class="card-body">
								<div class="d-flex align-items-center">
									<h5 class="mb-0 text-white">{{ $tmessage }} </h5>
									<div class="ms-auto">
                                        <i class='bx bx-envelope fs-3 text-white'></i>
									</div>
								</div>
								<div class="progress my-3 bg-light-transparent" style="height:3px;">
									<div class="progress-bar bg-white" role="progressbar" style="width: 55%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div class="d-flex align-items-center text-white">
									<p class="mb-0">Messages</p>
								</div>
							</div>
						 </div>
						</div>
					</div><!--end row-->




				 
					  <div class="card radius-10">
						<div class="card-body">
							<div class="d-flex align-items-center">
								<div>
									<h5 class="mb-0">Orders Summary</h5>
								</div>
								<div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
								</div>
							</div>
							<hr>
							<div class="table-responsive">
<table class="table align-middle mb-0">
<thead class="table-light">
	<tr>
		<th>#</th>
		<th>Book</th>
		<th>Customer</th>
		<th>Order Date</th>
		<th>Price</th>
		<th>Status</th>
	</tr>
</thead>
<tbody>
@php
		$counter =1;
		@endphp
		@foreach ($orderDetails as $order)
	<tr>
		
		<td>{{$counter++}}</td>
		<td>
		 <h6 class="mb-1 font-14">{{ $order->product_name}}</h6>
		</td>
		<td>{{ $order->name}}</td>
		<td>{{ $order->order_date}}</td>
		<td>£ {{ $order->price}}</td>
		<td>
			@if($order->order_status == 'Pending')
			<div class="badge rounded-pill bg-light-danger text-danger w-100">Pending</div>
			@endif
			@if($order->order_status == 'Delivered')
			<div class="badge rounded-pill bg-light-success text-success w-100">Delivered</div>
			@endif
			@if($order->order_status == 'Processing')
				<div class="badge rounded-pill bg-light-warning text-warning w-100">Processing</div>
			@endif
		</td>
		
		
	</tr>
	@endforeach
	
	<!-- <tr>
		<td>#335428</td>
		<td>
			<div class="d-flex align-items-center">
				<div class="recent-product-img">
					<img src="{{ asset('backend/assets/images/icons/user-interface.png') }}" alt="">
				</div>
				<div class="ms-2">
					<h6 class="mb-1 font-14">Purple Mobile Phone</h6>
				</div>
			</div>
		</td>
		<td>Keate Medona</td>
		<td>20 Jul 2020</td>
		<td>$75.00</td>
		<td>
			<div class="badge rounded-pill bg-light-info text-info w-100">In Progress</div>
		</td>
		<td>
			<div class="d-flex order-actions">	<a href="javascript:;" class=""><i class="bx bx-cog"></i></a>
				<a href="javascript:;" class="ms-4"><i class="bx bx-down-arrow-alt"></i></a>
			</div>
		</td>
	</tr> -->
	
	 
									</tbody>
								</table>
							</div>
						</div>
					</div>

			</div>
		</div>


@endsection
