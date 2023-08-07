@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Order Details</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Extend Invoice : <strong><span class="text-danger"> {{ $extend->extend_invoice_no }} </span></strong>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->
        <div class="container">
            <div class="main-body">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Old Invoice Number :</span></strong>
                                        {{ $extend->cart_order_id }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Extend Invoice Number :</span></strong>
                                        {{ $extend->extend_invoice_no }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Extended Rental Start Date :</span></strong>
                                        {{ $extend->extend_start_date }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Extended Rental End Date :</span></strong>
                                        {{ $extend->extend_end_date }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Extended Price :</span></strong>
                                        {{ $extend->extend_price }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">User Email :</span></strong>
                                        {{ $extend->email }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form method="post" action="{{ route('user.profile.store') }}" enctype="multipart/form-data">
                            @csrf
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Date :</span></strong>
                                            {{ $extend->order_date }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Time :</span></strong>
                                            {{ $extend->order_time }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Status :</span></strong>
                                            <span class="badge badge-pill" style="background: #FF0000;">{{ $extend->order_status }}</span>
                                        </li>
                                        <br>
                                        @if($extend->order_status == 'pending')
                                        <a href="{{ route('extend_pending.extend_processing',$extend->id) }}" class="btn btn-block btn-success"> Processing Order</a>
                                        @elseif($extend->order_status == 'Processing')
                                        <a href="{{ route('extend_processing.extend_complete',$extend->id) }}" class="btn btn-block btn-success"> Complete Order</a>
                                        @endif
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
