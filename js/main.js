// Câu 1: Tạo danh sách nhân viên ban đầu
var danhSachNhanVien = [];

// Câu 3: Định nghĩa đối tượng NhanVien
function NhanVien(taiKhoan, hoVaTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoVaTen = hoVaTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
}

// Câu 2: Thêm nhân viên
function hienThiDanhSachNhanVien(danhSach) {
    var tbody = document.getElementById('tableDanhSach');
    var htmlContent = '';

    for (var i = 0; i < danhSach.length; i++) {
        var nhanVien = danhSach[i];
        htmlContent += '<tr><td>' + nhanVien.taiKhoan + '</td><td>' + nhanVien.hoVaTen + '</td><td>' + nhanVien.email + '</td><td>' + nhanVien.ngayLam + '</td><td>' + nhanVien.chucVu + '</td><td>' + nhanVien.tongLuong() + '</td><td>' + nhanVien.xepLoai() + '</td><td><button class="btn btn-danger btnDelete" data-id="' + nhanVien.taiKhoan + '">Xóa</button></td></tr>';
    }

    tbody.innerHTML = htmlContent;
}

// Câu 4: Validation
document.getElementById('btnThemNV').addEventListener('click', function() {
    var taiKhoan = document.getElementById('tknv').value.trim();
    var hoVaTen = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var matKhau = document.getElementById('password').value.trim();
    var ngayLam = document.getElementById('datepicker').value.trim();
    var luongCB = parseFloat(document.getElementById('luongCB').value.trim());
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = parseInt(document.getElementById('gioLam').value.trim());

    // Validation
    if (taiKhoan === '' || hoVaTen === '' || email === '' || matKhau === '' || ngayLam === '' || isNaN(luongCB) || chucVu === 'Chọn chức vụ' || isNaN(gioLam)) {
        alert("Vui lòng điền đầy đủ thông tin và chọn chức vụ");
        return;
    }
    // Kiểm tra các ràng buộc khác
    if (!/^\d{4,6}$/.test(taiKhoan)) {
        alert("Tài khoản phải có từ 4-6 chữ số");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(hoVaTen)) {
        alert("Họ tên chỉ chứa chữ cái");
        return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(email)) {
        alert("Email không hợp lệ");
        return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10}$/.test(matKhau)) {
        alert("Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và có độ dài từ 6-10 ký tự");
        return;
    }
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(ngayLam)) {
        alert("Ngày làm không hợp lệ, định dạng mm/dd/yyyy");
        return;
    }
    if (luongCB < 1000000 || luongCB > 20000000) {
        alert("Lương cơ bản phải nằm trong khoảng từ 1,000,000 - 20,000,000");
        return;
    }
    if (gioLam < 80 || gioLam > 200) {
        alert("Số giờ làm phải nằm trong khoảng từ 80 - 200");
        return;
    }

    var nhanVienMoi = new NhanVien(taiKhoan, hoVaTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

    danhSachNhanVien.push(nhanVienMoi);

    hienThiDanhSachNhanVien(danhSachNhanVien);

    $('#myModal').modal('hide');
});

// Câu 5: Xây dựng phương thức tính tổng lương cho đối tượng nhân viên 
NhanVien.prototype.tongLuong = function() {
    var luong = this.luongCB;
    switch (this.chucVu) {
        case "Sếp":
            return luong * 3;
        case "Trưởng phòng":
            return luong * 2;
        case "Nhân viên":
            return luong;
        default:
            return 0;
    }
};



// Câu 6: Xây dựng phương thức xếp loại cho đối tượng nhân viên 
NhanVien.prototype.xepLoai = function() {
    if (this.gioLam >= 192) {
        return "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
        return "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
        return "Nhân viên khá";
    } else {
        return "Nhân viên trung bình";
    }
};


// Câu 7: Xóa nhân viên
document.addEventListener('click', function(event) {
    if (event.target.matches('.btnDelete')) {
        var taiKhoan = event.target.getAttribute('data-id');
        for (var i = 0; i < danhSachNhanVien.length; i++) {
            if (danhSachNhanVien[i].taiKhoan === taiKhoan) {
                danhSachNhanVien.splice(i, 1);
                break;
            }
        }
        hienThiDanhSachNhanVien(danhSachNhanVien);
    }
});

// Câu 8: Cập nhật nhân viên (có validation)
document.getElementById('btnCapNhat').addEventListener('click', function() {
    var taiKhoan = document.getElementById('tknv').value.trim();
    var hoVaTen = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var matKhau = document.getElementById('password').value.trim();
    var ngayLam = document.getElementById('datepicker').value.trim();
    var luongCB = parseFloat(document.getElementById('luongCB').value.trim());
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = parseInt(document.getElementById('gioLam').value.trim());

    // Validation
    if (taiKhoan === '' || hoVaTen === '' || email === '' || matKhau === '' || ngayLam === '' || isNaN(luongCB) || chucVu === 'Chọn chức vụ' || isNaN(gioLam)) {
        alert("Vui lòng điền đầy đủ thông tin và chọn chức vụ");
        return;
    }
    // Kiểm tra các ràng buộc khác
    if (!/^\d{4,6}$/.test(taiKhoan)) {
        alert("Tài khoản phải có từ 4-6 chữ số");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(hoVaTen)) {
        alert("Họ tên chỉ chứa chữ cái");
        return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(email)) {
        alert("Email không hợp lệ");
        return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10}$/.test(matKhau)) {
        alert("Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và có độ dài từ 6-10 ký tự");
        return;
    }
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(ngayLam)) {
        alert("Ngày làm không hợp lệ, định dạng mm/dd/yyyy");
        return;
    }
    if (luongCB < 1000000 || luongCB > 20000000) {
        alert("Lương cơ bản phải nằm trong khoảng từ 1,000,000 - 20,000,000");
        return;
    }
    if (gioLam < 80 || gioLam > 200) {
        alert("Số giờ làm phải nằm trong khoảng từ 80 - 200");
        return;
    }

    var nhanVienCapNhat = new NhanVien(taiKhoan, hoVaTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

    for (var i = 0; i < danhSachNhanVien.length; i++) {
        if (danhSachNhanVien[i].taiKhoan === taiKhoan) {
            danhSachNhanVien[i] = nhanVienCapNhat;
            break;
        }
    }

    hienThiDanhSachNhanVien(danhSachNhanVien);
});

  
  // Câu 9: Tìm Nhân Viên theo loại (xuất sắc, giỏi, khá...) và hiển thị
  document.getElementById('btnTimNV').addEventListener('click', function() {
      var searchInput = removeAccents(document.getElementById('searchName').value.trim().toLowerCase());
  
      // Kiểm tra tìm kiếm không hợp lệ
      if (searchInput === '') {
          alert("Vui lòng nhập loại nhân viên để tìm kiếm");
          return;
      }
  
      var result = danhSachNhanVien.filter(function(nhanVien) {
          return removeAccents(nhanVien.xepLoai().toLowerCase()).includes(searchInput);
      });
  
      if (result.length === 0) {
          alert("Không tìm thấy nhân viên theo loại đã nhập");
          return;
      }
  
      hienThiDanhSachNhanVien(result);
  });
  
