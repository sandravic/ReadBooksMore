@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Return Details</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Invoice : <strong><span class="text-danger">{{ $returns->invoice_no }}</span></strong>
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
                                        <strong><span class="text-dark">Extend Invoice No(if extend) :</span></strong>
                                        {{ $returns->extend_invoice_no }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">Product Name :</span></strong>
                                        {{ $returns->product_name }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">ISBN :</span></strong>
                                        {{ $returns->ISBN }}
                                    </li>
                                
                                   
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">User Email :</span></strong>
                                        {{ $returns->email }}
                                    </li>
                                    <li class="list-group-item">
                                        <strong><span class="text-dark">User Name :</span></strong>
                                        {{ $returns->name }}
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
                                            <strong><span class="text-dark">Return Address:</span></strong>
                                            {{ $returns->return_address }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">From Address :</span></strong>
                                            {{ $returns->from_address }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Contact Number :</span></strong>
                                            {{ $returns->contact_number }}
                                        </li>
                                    
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Return Date :</span></strong>
                                            {{ $returns->return_date }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Return Time :</span></strong>
                                            {{ $returns->return_time }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Return Status :</span></strong>
                                            <span class="badge badge-pill" style="background: #FF0000;">{{ $returns->return_status }}</span>
                                        </li>
                                        <br>
                                        @if($returns->return_status == 'Return Initiated')
                                        <a href="{{ route('return_pending.return_processing',$returns->id) }}" class="btn btn-block btn-success"> Processing Order</a>
                                        @elseif($returns->return_status == 'Checking')
                                        <a href="{{ route('return_processing.return_complete',$returns->id) }}" class="btn btn-block btn-success"> Complete Order</a>
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
