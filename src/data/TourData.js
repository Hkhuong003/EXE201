const tourData = [
    {
      id: 1,
      title: "Tour Đà Lạt 3 ngày 2 đêm",
      image: "/images/tour-main.jpg",
      price: "1.999.000đ",
      gallery: ["/images/tour1.jpg", "/images/tour2.jpg", "/images/tour3.jpg"],
      details: {
        schedule: "Lịch trình tour chi tiết...",
        policy: "Điều khoản và chính sách...",
        price: "Bảng giá chi tiết..."
      },
      schedule: [
        { title: "Ngày 1: Khởi hành", description: "Khởi hành từ TP.HCM..." },
        { title: "Ngày 2: Tham quan", description: "Tham quan thành phố..." },
        { title: "Ngày 3: Kết thúc", description: "Trở về điểm xuất phát..." }
      ],
      info: { hotline: "0934 784 728", email: "support@dalatchill.com" }
    },
    {
      id: 2,
      title: "Tour Sapa 4 ngày 3 đêm",
      image: "/images/tour-main2.jpg",
      price: "2.499.000đ",
      gallery: ["/images/sapa1.jpg", "/images/sapa2.jpg", "/images/sapa3.jpg"],
      details: {
        schedule: "Lịch trình tour Sapa...",
        policy: "Điều khoản tour Sapa...",
        price: "Bảng giá tour Sapa..."
      },
      schedule: [
        { title: "Ngày 1: Xuất phát", description: "Khởi hành từ Hà Nội..." },
        { title: "Ngày 2: Tham quan", description: "Khám phá bản làng..." },
        { title: "Ngày 3: Chinh phục Fansipan", description: "Leo Fansipan..." },
        { title: "Ngày 4: Kết thúc", description: "Trở về Hà Nội..." }
      ],
      info: { hotline: "0987 654 321", email: "support@sapatour.com" }
    }
  ];
  
  export default tourData;
  