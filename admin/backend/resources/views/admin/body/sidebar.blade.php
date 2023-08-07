<div class="sidebar-wrapper" data-simplebar="true">
    <div class="sidebar-header">
        <div>
            <img src="{{ asset('backend/assets/images/icon-512x512.png') }}" class="logo-icon" alt="logo icon">
        </div>
        <div>
            <h4 class="logo-text">Readbookmore.com</h4>
        </div>
        <div class="toggle-icon ms-auto">
            <i class='bx bx-arrow-to-left'></i>
        </div>
    </div>
    <!--navigation-->
    <ul class="metismenu" id="menu">

        <li>
            <a href="{{ url('/dashboard') }}">
                <div class="parent-icon"><i class='bx bx-home-circle'></i></div>
                <div class="menu-title">Dashboard</div>
            </a>
        </li>

        <li class="menu-label">Sections</li>

        <li>
            <a href="javascript:;" class="has-arrow">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title">Category</div>
            </a>
            <ul>
                <li><a href="{{ route('all.category') }}"><i class="bx bx-right-arrow-alt"></i>All Category</a></li>
                <li><a href="{{ route('add.category') }}"><i class="bx bx-right-arrow-alt"></i>Add Category</a></li>
            </ul>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title">Sub Category</div>
            </a>
            <ul>
                <li><a href="{{ route('all.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>All SubCategory</a></li>
                <li><a href="{{ route('add.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>Add SubCategory</a></li>
            </ul>
        </li>

        <li>
            <a href="javascript:;" class="has-arrow">
                <div class="parent-icon"><i class='bx bx-user'></i></div>
                <div class="menu-title">Author</div>
            </a>
            <ul>
                <li><a href="{{ route('all.author') }}"><i class="bx bx-right-arrow-alt"></i>All Author</a></li>
                <li><a href="{{ route('add.author') }}"><i class="bx bx-right-arrow-alt"></i>Add Author</a></li>
            </ul>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-slider"></i></div>
                <div class="menu-title">Slider</div>
            </a>
            <ul>
                <li><a href="{{ route('all.slider') }}"><i class="bx bx-right-arrow-alt"></i>All Slider</a></li>
                <li><a href="{{ route('add.slider') }}"><i class="bx bx-right-arrow-alt"></i>Add Slider</a></li>
            </ul>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-book"></i></div>
                <div class="menu-title">Product</div>
            </a>
            <ul>
                <li><a href="{{ route('all.product') }}"><i class="bx bx-right-arrow-alt"></i>All Product</a></li>
                <li><a href="{{ route('add.product') }}"><i class="bx bx-right-arrow-alt"></i>Add Product</a></li>
            </ul>
        </li>

        <li>
            <a href="{{ route('contact.message') }}">
                <div class="parent-icon"><i class="bx bx-donate-blood"></i></div>
                <div class="menu-title">Contact Message</div>
            </a>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title">Notifications</div>
            </a>
            <ul>
                <li><a href="{{ route('all.notifications') }}"><i class="bx bx-right-arrow-alt"></i>All Notifications</a></li>
                <li><a href="{{ route('add.notifications') }}"><i class="bx bx-right-arrow-alt"></i>Add Notifications</a></li>
            </ul>
        </li>

        <li>
            <a href="{{ route('all.review') }}">
                <div class="parent-icon"><i class="bx bx-donate-blood"></i></div>
                <div class="menu-title">Product Review</div>
            </a>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-donate-blood"></i></div>
                <div class="menu-title">Site Info</div>
            </a>
            <ul>
                <li><a href="{{ route('getsite.info') }}"><i class="bx bx-right-arrow-alt"></i>Get Site Info</a></li>
            </ul>
        </li>

        <li class="menu-label">Customer Order</li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title"> Order</div>
            </a>

            <ul>
                <li><a href="{{ route('pending.order') }}"><i class="bx bx-right-arrow-alt"></i>Pending Order</a></li>
                <li><a href="{{ route('processing.order') }}"><i class="bx bx-right-arrow-alt"></i>Processing Order</a></li>
                <li><a href="{{ route('complete.order') }}"><i class="bx bx-right-arrow-alt"></i>Complete Order</a></li>
            </ul>
        </li>

        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title"> Extend Order</div>
            </a>

            <ul>
                <li><a href="{{ route('extend_pending.extend') }}"><i class="bx bx-right-arrow-alt"></i>Pending Extend </a></li>
                <li><a href="{{ route('extend_processing.extend') }}"><i class="bx bx-right-arrow-alt"></i>Processing Extend</a></li>
                <li><a href="{{ route('extend_complete.extend') }}"><i class="bx bx-right-arrow-alt"></i>Complete Extend</a></li>
            </ul>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-message-square-edit'></i></div>
                <div class="menu-title"> Return Order</div>
            </a>

            <ul>
                <li><a href="{{ route('return_pending.returns') }}"><i class="bx bx-right-arrow-alt"></i>Pending Return </a></li>
                <li><a href="{{ route('return_processing.returns') }}"><i class="bx bx-right-arrow-alt"></i>Processing Return</a></li>
                <li><a href="{{ route('return_complete.returns') }}"><i class="bx bx-right-arrow-alt"></i>Complete Return</a></li>
            </ul>
        </li>

        <!-- <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-grid-alt"></i></div>
                <div class="menu-title">Tables</div>
            </a>
            <ul>
                <li><a href="table-basic-table.html"><i class="bx bx-right-arrow-alt"></i>Basic Table</a></li>
                <li><a href="table-datatable.html"><i class="bx bx-right-arrow-alt"></i>Data Table</a></li>
            </ul>
        </li> -->

        <li>
            <a href="https://themeforest.net/user/codervent" target="_blank">
                <div class="parent-icon"><i class="bx bx-support"></i></div>
                <div class="menu-title">Support</div>
            </a>
        </li>
    </ul>
    <!--end navigation-->
</div>
