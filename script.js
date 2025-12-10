
// تعريف بيانات المنصات والمبادرات
const platforms = [
  {
    id: "care-platform",
    name: "منصة العناية بالعملاء",
    category: "تحسين تجربة المستفيد",
    owner: "الإدارة العامة للعمليات الرقمية وتشغيل بلدي",
    description:
      "منصة رقمية متكاملة لإدارة طلبات واستفسارات المستفيدين، تتيح تسجيل الطلبات، متابعتها، وتحليل مؤشرات الأداء المرتبطة بجودة الخدمة.",
    goals: [
      "رفع رضا المستفيد عن الخدمات البلدية.",
      "توحيد قناة استقبال ومعالجة طلبات واستفسارات المستفيدين.",
      "تقليل زمن معالجة الطلبات عبر الأتمتة والربط مع الأنظمة الأخرى."
    ],
    features: [
      "لوحة تحكم لإدارة الطلبات ومتابعة حالتها.",
      "تنبيهات آلية للموظف والمستفيد.",
      "تقارير دورية عن مستويات الإنجاز وجودة الخدمة."
    ],
    kpis: [
      "متوسط زمن إغلاق الطلب.",
      "نسبة الطلبات المكتملة ضمن الزمن المستهدف.",
      "نسبة رضا المستفيد عن الخدمة."
    ],
    beneficiaries: ["موظفو الأمانة", "المستفيدون الخارجيون"],
    images: ["assets/care-platform.png"]
  },
  {
    id: "dates-platform",
    name: "منصة تمور الأحساء المصنعة",
    category: "التميز الاستثماري والخدمي",
    owner: "الإدارة العامة للعمليات الرقمية وتشغيل بلدي",
    description:
      "منصة إلكترونية تعنى بتنظيم بيانات التمور المصنعة في الأحساء، وتمكين تتبع المنتجات والخدمات ذات العلاقة بالقطاع.",
    goals: [
      "دعم القطاع الاستثماري في مجال التمور.",
      "توفير قاعدة بيانات رقمية موحدة للتمور المصنعة.",
      "تعزيز موثوقية المعلومات وتسهيل الوصول إليها."
    ],
    features: [
      "إدارة بيانات المنتجات والمصانع.",
      "عرض تقارير وإحصائيات عن المنتجات.",
      "التكامل مع منصات استثمارية وخدمية أخرى."
    ],
    kpis: [
      "عدد الجهات/المصانع المسجلة.",
      "عدد المنتجات الموثقة.",
      "معدل استخدام المنصة من قبل الجهات المستفيدة."
    ],
    beneficiaries: ["القطاع الاستثماري", "إدارات الأمانة المعنية"],
    images: ["assets/dates-platform.png"]
  },
  {
    id: "sharek-platform",
    name: "منصة شارك",
    category: "إدارة الوثائق والملفات",
    owner: "الإدارة العامة للعمليات الرقمية وتشغيل بلدي",
    description:
      "منصة داخلية لحفظ ومشاركة المستندات والملفات بجميع أنواعها، تستغل الخوادم الشاغرة لدى الأمانة وتدعم التحول الرقمي وتقليل الاعتماد على الورق.",
    goals: [
      "تقليل نفقات الطباعة والاعتماد على الورق.",
      "تسهيل مشاركة الملفات بين الإدارات.",
      "رفع موثوقية وأمن الوثائق."
    ],
    features: [
      "رفع وتحميل المستندات بمختلف الصيغ.",
      "روابط مشاركة داخلية وخارجية.",
      "إدارة صلاحيات الوصول للمستخدمين."
    ],
    kpis: [
      "عدد الملفات المخزنة رقمياً.",
      "حجم الوفر في نفقات الطباعة.",
      "عدد المستخدمين النشطين في المنصة."
    ],
    beneficiaries: ["جميع إدارات الأمانة", "اللجان والمشاريع المشتركة"],
    images: ["assets/sharek-platform.png"]
  }
];

// عناصر DOM
const platformList = document.getElementById("platformList");
const platformDetails = document.getElementById("platformDetails");
const searchInput = document.getElementById("searchInput");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let selectedPlatform = null;

// تهيئة القائمة
function renderPlatformList(filter = "") {
  platformList.innerHTML = "";
  const query = filter.trim().toLowerCase();

  const filtered = platforms.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "لا توجد منصات مطابقة لبحثك.";
    platformList.appendChild(li);
    return;
  }

  filtered.forEach((platform) => {
    const li = document.createElement("li");
    li.dataset.id = platform.id;

    const nameEl = document.createElement("div");
    nameEl.className = "platform-name";
    nameEl.textContent = platform.name;

    const tagEl = document.createElement("div");
    tagEl.className = "platform-tag";
    tagEl.textContent = platform.category;

    li.appendChild(nameEl);
    li.appendChild(tagEl);

    li.addEventListener("click", () => {
      document
        .querySelectorAll("#platformList li")
        .forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
      showPlatformDetails(platform.id);
      botReply(
        `تم اختيار **${platform.name}**.\nيمكنني تزويدك بالأهداف، المزايا، المستفيدين أو مؤشرات الأداء الخاصة بها.`
      );
    });

    platformList.appendChild(li);
  });
}

// عرض تفاصيل منصة
function showPlatformDetails(id) {
  const platform = platforms.find((p) => p.id === id);
  if (!platform) return;
  selectedPlatform = platform;

  platformDetails.innerHTML = `
    <h2>${platform.name}</h2>
    <div class="platform-meta">
      <span class="badge">الفئة: ${platform.category}</span>
      <span class="badge">الجهة المالكة: ${platform.owner}</span>
    </div>

    <p>${platform.description}</p>

    <div>
      <div class="section-title">الأهداف الرئيسية</div>
      <ul>
        ${platform.goals.map((g) => `<li>${g}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">أبرز المزايا</div>
      <ul>
        ${platform.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">مؤشرات الأداء (KPIs)</div>
      <ul>
        ${platform.kpis.map((k) => `<li>${k}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">الفئات المستفيدة</div>
      <div class="tag-list">
        ${platform.beneficiaries.map((b) => `<span>${b}</span>`).join("")}
      </div>
    </div>

    <div>
      <div class="section-title">صور من المنصة</div>
      <div class="images-grid">
        ${
          platform.images && platform.images.length
            ? platform.images
                .map(
                  (src) =>
                    `<img src="${src}" alt="صورة من ${platform.name}" />`
                )
                .join("")
            : "<span>لم يتم إضافة صور بعد.</span>"
        }
      </div>
    </div>
  `;
}

// نظام رسائل بسيط

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = text.replace(/\n/g, "<br>");
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(text) {
  addMessage(text, "bot");
}

function handleUserMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";

  // منطق بسيط يفهم بعض الأسئلة بالعربي
  const lower = text.toLowerCase();

  // إذا سأل عن منصة بالاسم
  const foundPlatform = platforms.find((p) =>
    lower.includes(p.name.toLowerCase())
  );

  if (foundPlatform) {
    showPlatformDetails(foundPlatform.id);
    botReply(
      `هذا ملخص عن **${foundPlatform.name}**:\n- الفئة: ${foundPlatform.category}\n- أهم هدف: ${foundPlatform.goals[0]}\nيمكنك أيضًا اختيارها من القائمة لمشاهدة المزيد من التفاصيل والصور.`
    );
    return;
  }

  if (!selectedPlatform) {
    botReply(
      "فضلًا، اختر منصة من القائمة أولاً أو اذكر اسم المنصة في سؤالك لأتمكن من مساعدتك بشكل أدق. 😊"
    );
    return;
  }

  // أسئلة حسب الكلمات
  if (lower.includes("هدف") || lower.includes("أهداف")) {
    botReply(
      `الأهداف الرئيسية لمنصة **${selectedPlatform.name}**:\n- ${selectedPlatform.goals.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("ميزة") ||
    lower.includes("المزايا") ||
    lower.includes("مميزات")
  ) {
    botReply(
      `أبرز المزايا في منصة **${selectedPlatform.name}**:\n- ${selectedPlatform.features.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("مؤشر") ||
    lower.includes("kpi") ||
    lower.includes("الأداء")
  ) {
    botReply(
      `مؤشرات الأداء المرتبطة بمنصة **${selectedPlatform.name}**:\n- ${selectedPlatform.kpis.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("مستفيد") ||
    lower.includes("مستفيدين") ||
    lower.includes("جهة")
  ) {
    botReply(
      `الفئات المستفيدة من منصة **${selectedPlatform.name}**:\n- ${selectedPlatform.beneficiaries.join(
        "\n- "
      )}`
    );
  } else if (lower.includes("صورة") || lower.includes("صور")) {
    if (selectedPlatform.images && selectedPlatform.images.length) {
      botReply(
        `تم عرض صور منصة **${selectedPlatform.name}** في قسم التفاصيل على اليسار. يمكنك استعراض واجهات المنصة هناك. 📸`
      );
    } else {
      botReply(
        `لا توجد صور مضافة حاليًا لمنصة **${selectedPlatform.name}**، يمكن لاحقًا إضافة لقطات شاشة للمنصة لإثراء التجربة البصرية.`
      );
    }
  } else {
    botReply(
      `أستطيع تزويدك بمعلومات عن الأهداف، المزايا، المستفيدين، مؤشرات الأداء أو الصور لمنصة **${selectedPlatform.name}**.\nجرّب مثلًا: "ما هي أهداف المنصة؟" أو "من المستفيد من هذه المنصة؟" `
    );
  }
}

// الأحداث

searchInput.addEventListener("input", (e) =>
  renderPlatformList(e.target.value)
);

sendBtn.addEventListener("click", handleUserMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserMessage();
  }
});

// تشغيل أولي
renderPlatformList();

// *91JA (J'F'* 'DEF5'* H'DE('/1'*
const platforms = [
 {
  id: "care",
  name: "EF5) 'D9F'J) ('D9ED'!",
  category: "*-3JF *,1() 'DE3*AJ/",
  owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
  description:
    "EF5) 1BEJ) E*C'ED) D%/'1) 7D('* H'3*A3'1'* 'DE3*AJ/JF**J-*3,JD 'D7D('*E*'(9*G'H*-DJD E$41'* 'D#/'! 'DE1*(7) (,H/) 'D./E).",
  goals: [
    "1A9 16' 'DE3*AJ/ 9F 'D./E'* 'D(D/J).",
    "*H-J/ BF') '3*B('D HE9'D,) 7D('* H'3*A3'1'* 'DE3*AJ/JF.",
    "*BDJD 2EF E9'D,) 'D7D('* 9(1 'D#*E*) H'D1(7 E9 'D#F8E) 'D#.1I."
  ],
  features: [
    "DH-) *-CE D%/'1) 'D7D('* HE*'(9) -'D*G'.",
    "*F(JG'*\"DJ) DDEH8A H'DE3*AJ/.",
    "*B'1J1 /H1J) 9F E3*HJ'* 'D%F,'2 H,H/) 'D./E)."
  ],
  costsave: [
    "*BDJD *C'DJA E1'C2 'D./E'* 'D*BD/J)",
    "*BDJD '3*GD'C 'D#H1'B 9(1 E9'D,) 'D7D('* 'DC*1HFJK'"
  ],
  beneficiaries: ["EH8AH 'D#E'F)", "'DE3*AJ/HF 'D.'1,JHF"],
  images: ["assets/csc.png"]
},
  {
    id: "tomor",
    name: "EF5) *EH1 'D#-3'! 'DE5F9)",
    category: " *-3JF *,1() 'DE3*AJ/ ",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
    "EF5) D*F8JE EG1,'F *EH1 'D#-3'! 'DE5F9) H%/'1) 'DE4'1C'* H'DA9'DJ'*.",
    goals: [
      "/9E 'DB7'9 'D'3*+E'1J AJ E,'D 'D*EH1.",
      "'D*4,J9 H'D*3HJB D-6H1 'DEG1,'F H'D*91JA ('DA9'DJ'* 'DEB'E).",
      "*92J2 EH+HBJ) 'DE9DHE'* H*3GJD 'DH5HD %DJG'."
    ],
    features: [
      "%EC'FJ) -,2 E3'-) D916 'DEF*,'*.",
      "916 *B'1J1 H%-5'&J'* 9F 'DEG1,'F.",
      "-,2 'D*0'C1 H'DE4'1C) AJ 'DE3'(B'* H'DA9'DJ'*."
    ],
    costsave: [
      ".A6 *C'DJA 'D*F8JE 'DJ/HJ.",
      "*BDJD 'DE9'ED'* 'DH1BJ) 9(1 %/'1) 'D41'C'* 1BEJK'"
    ],
    beneficiaries: ["'DB7'9 'D'3*+E'1J", "'DE3*AJ/HF 'D.'1,JHF"],
    images: ["assets/tomor.png"]
  },
  {
    id: "sharek",
    name: "EF5) 4'1C",
    category: "%/'1) 'DH+'&B 'D#14A)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "EF5) /'.DJ) D-A8 HE4'1C) 'DE3*F/'* H'DEDA'* (,EJ9 #FH'9G' *3*:D 'D.H'/E 'D4':1) D/I 'D#E'F) H*/9E 'D*-HD 'D1BEJ H*BDJD 'D'9*E'/ 9DI 'DH1B.",
    goals: [
      "*BDJD FAB'* 'D7('9) H'D'9*E'/ 9DI 'DH1B.",
      "*3GJD E4'1C) 'DEDA'* (JF 'D%/'1'*.",
      "1A9 EH+HBJ) H#EF 'DH+'&B."
    ],
    features: [
      "1A9 H*-EJD 'DE3*F/'* (E.*DA 'D5J:.",
      "1H'(7 E4'1C) /'.DJ) H.'1,J).",
      "%/'1) 5D'-J'* 'DH5HD DDE3*./EJF."
    ],
    costsave: [
      "*BDJD 'D'9*E'/ 9DI 'DH1B   .",
      "'3*:D'D 'DE3'-) 'DE*'-) 9DI 'D.H'/E.",
      "'D'3*:F'! 9F 41'! ./E'* *.2JF 3-'(J EF E2H/ ./E) .'1,J."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: ["assets/sharek.png"]
  },
    {
    id: "unesco",
    name: "EF5) 'D#-3'! 'DE(/9)",
    category: "EF5) E9DHE'*J)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "EF5) D%(1'2 'DGHJ) 'D+B'AJ) H'D%(/'9J) DD#-3'! H916 'DE('/1'* H'DA9'DJ'* 'DE1*(7) (96HJ*G' AJ 4(C) 'DJHF3CH.",
    goals: [
      "F41 +B'A) 'D#-3'! 'DE(/9) HEF8E) 'DJHF3CH.",
      "916 'DA9'DJ'* H'D%F,'2'* (4CD 13EJ.",
      "1A9 EH+HBJ) H#EF 'DH+'&B."
    ],
    features: [
      "%EC'FJ) 'D*H'5D H'(/'! 'DED'-8'* (4#F 'DA9'DJ'* 'DE*9DB) ('D'-3'! 'DE(/9).",
      "%EC'FJ) 'DE4'1C) AJ 'D#-/'+ 'DE3*6'A) AJ 'D'-3'! DDE/F 'DE(/9)"
    ],
    costsave: [
      "*BDJD E5'1JA 'D-ED'* 'D*1HJ,J) H'DE7(H9'* 'D*BDJ/J)."
    ],
    beneficiaries: ["'DE3*AJ/HF 'D.'1,JHF"],
    images: ["assets/unesco.png"],

  },
 
   {
    id: "eserv",
    name: "EF5) 'DB19) 'D'DC*1HFJ)",
    category: "'D4A'AJ) H'D-HCE) ",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "F8'E D%,1'! B19'* -CHEJ) 9'/D) H4A'A) /HF */.D (41J E9 *H+JB C'ED DDF*'&,.",
    goals: [
      "F41 'DF*'&, 9(1 (+ E('41",
      "%,1'! 'DB19) (4CD 9'/D /HE */.D (41J"
    ],
    features: [
      "%EC'FJ) E*'(9) 'DB19) 'D'DC*1HFJ) 9F (9/.",
      "*BDJD 'D,G/ H'DHB* 'DE3*:1B D%,1'! 'DB19)"
    ],
    costsave: [
      ".A6 *C'DJA 'D',*E'9'* 'DH1BJ) H'DHB* 'DE3*./E."
    ],
    beneficiaries: ["'DE3*AJ/HF 'D.'1,JHF"]

  },

   {
    id: "archive",
    name: "'D#14JA 'D%DC*1HFJ",
    category: "%/'1) 'DH+'&B 'D#14A)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "JE+D 'D#14JA 'D%DC*1HFJ EF5) 1BEJ) E.5Q5) D-A8 'DH+'&B H'DE3*F/'* H'D#H'E1 H'DB1'1'* (4CD "EF HEF8E E9 %EC'FJ) 'DH5HD %DJG' (3GHD) HAB 5D'-J'* E-//) EE' J3'9/ 9DI -A8 *'1J. 'D#E'F) HJO3GD '3*1,'9 'DE9DHE'* 9F/ 'D-',) /HF 'D'9*E'/ 9DI 'D#14A) 'DH1BJ) 'D*BDJ/J).",
    goals: [
      "-A8 H#14A) H+'&B 'D#E'F) (5H1) 1BEJ).",
      "*3GJD 'DH5HD DDE3*F/'* H'DB1'1'*.",
      "*BDJD 'D'9*E'/ 9DI 'D#14A) 'DH1BJ)."
    ],
    features: [
      "*.2JF 'DE3*F/'* (4CD "EF HEF8E." ,
      "5D'-J'* 'DH5HD DDE3*F/ -3( 'D,G) #H 'DEH8A.",
      "'D(-+ 'D31J9 H'3*1,'9 'DH+'&B AH1K'.",
      "-A8 3,D *'1J.J DDB1'1'* H'DE3*F/'*."
    ],
    costsave: [
      "*.AJ6 *C'DJA 'D#14A) 'DH1BJ) H'D*.2JF.",
      "*BDJD 'DHB* 'DD'2E DD(-+ H'3*1,'9 'DEDA'*.",
      "1A9 CA'!) %/'1) 'DE91A) H-A8 'DH+'&B /'.D 'D#E'F)."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: ["assets/archive.png"]

  },
  {
    id: "inform",
    name: "'D*9'EJE 'D%DC*1HFJ)",
    category: "%/'1) 'DH+'&B 'D#14A)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "JHA1 F8'E 'D*9'EJE 'D%DC*1HFJ)"DJ)1BEJ) D%5/'1 'D*9'EJE H'DE1'3D'* 'D/'.DJ) /'.D 'D#E'F) H*H2J9G' 9DI 'D%/'1'* H'DEH8AJF E9 %6'A) 9D'E) E'&J) D6(7 'DGHJ) HEF9 'D'3*./'E :J1 'D5-J- EE' J3GE AJ F41 'D*9'EJE (4CD EH-/ H31J9 H3GD 'D1,H9 %DJG.",
    goals: [
      "%5/'1 'D*9'EJE %DC*1HFJK' /'.D 'D#E'F).",
      "*H-J/ #3DH( 'D*H2J9 9DI 'D%/'1'* H'DEH8AJF.",
      "*92J2 'D6(7 'DE$33J ('3*./'E 'D9D'E) 'DE'&J)."
    ],
    features: [
      "%5/'1 H*H2J9 'D*9'EJE (319).",
      "%6'A) 9D'E) E'&J) D6(7 'DGHJ).",
      "-A8 H#14A) 'D*9'EJE H3GHD) 'D1,H9 DG'.",
      "/9E 'D*-HD 'D1BEJ H*BDJD 'DE.'7('* 'DH1BJ)."
    ],
    costsave: [
      "*BDJD 'D*C'DJA 'DH1BJ) H'D7('9J).",
      "*BDJD 'DHB* H'D,G/ AJ *H2J9 'D*9'EJE J/HJK'.",
      "1A9 CA'!) 'D%,1'!'* H*BDJD 'DG/1 AJ 'DEH'1/."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: ["assets/inform.png"]

  },
  {
    id: "esnad",
    name: "%3F'/",
    category: "%/'1) EG'E E$33J)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "J9/ F8'E %3F'/ EF5) %DC*1HFJ) D%/'1) 7D('* 'D/9E 'DAFJ H'D%/'1J H%/'1) 'D5D'-J'* /'.D 'D,G) EF .D'D 1A9 'D7D('* H'9*E'/G' HE*'(9*G' HAB 3J1 %,1'! E-HCE -*I 'D%:D'B.",
    goals: [
      "%/'1) 7D('* 'D/9E 'DAFJ H'D%/'1J (4CD EH-Q/.", 
      "E*'(9) 'D7D('* -*I 'D%:D'B (4A'AJ).",
      "1A9 ,H/) 'D./E'* H*31J9 'D'3*,'()."
    ],
    features: [
      ".3J1 %,1'! E-HCE D'9*E'/ 'D7D('*",
      "1(7 'DEG'E ('DEH8AJF H%49'1'* (1J/J)",
      "*B'1J1 E*'(9) H%F,'2 /BJB).",
      "E*'(9) D-8J) DE1'-D 'D7D("
    ],
    costsave: [
      "*BDJD 'D,G/ H'DHB* AJ 'DE9'D,) 'DJ/HJ).",
      "*BDJD 'D7('9) H'DE1'3D'* 'DH1BJ).",
      ".A6 'D'2/H',J) H*C1'1 'D7D('*."
    ],
    beneficiaries: ["EH8AH 'D#E'F) - 'DE3*AJ/JF"],
    images: ["assets/unesco.png"]

  },
  {
    id: "form",
    name: "'D'3*(J'F'* 'D%DC*1HFJ)",
    category: "%41'C 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description:
      "J9/ F8'E 'D'3*(J'F'* EF5) %DC*1HFJ) D%F4'! H%/'1) 'D'3*('F'* /'.D 'D,G) H*-DJD F*'&,G' (4CD "DJE9 %EC'FJ) F41G' DDE3*G/AJF 9(1 'D(1J/ 'D%DC*HFJ 'DE$33J EE' J3GE AJ ,E9 'D(J'F'* HBJ'3 E3*HI 'D16' H'*.'0 'DB1'1'* (F'!K 9DI E$41'* /BJB).",
    goals: [
      "%9/'/ H%/'1) 'D'3*(J'F'* (3GHD) H'-*1'AJ).", 
      "*-DJD 'DF*'&, "DJ'K /HF */.D J/HJ.",
      "/9E '*.'0 'DB1'1 '9*E'/K' 9DI (J'F'* HE$41'*."
    ],
    features: [
      "%F4'! 'D'3*(J'F'* (E.*DA 'D#FH'9.",
      "F41 'D'3*(J'F'* 9(1 'D(1J/ 'DE$33J.",
      "*HDJ/ *B'1J1.",
      "3GHD) E*'(9) 1/H/ 'DE4'1CJF."
    ],
    costsave: [
      "*BDJD 'D,G/ H'DHB* AJ %9/'/ 'D/1'3'* J/HJ'K.",
      "*BDJD *CDA) 'D'3*(J'F'* 'DH1BJ).",
      "/9E B1'1'* A9'D) *$+1 9DI CA'!) 'D%FA'B."
    ],
    beneficiaries: ["EH8AH 'D#E'F) - 'DE3*AJ/JF"],
    images: ["assets/esnad.png"]

  },
   {
    id: "award",
    name: ",'&2) 'D#EJF",
    category: "'D4A'AJ) H'D-HCE)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "**J- EF5) ,'&2) 'D#EJF DD*EJ2 %/'1) 'D,'&2) H'3*B('D 'DE4'1C'* H*-CJEG' %DC*1HFJK' (71JB) E-CE) HEH-/) (E' J6EF 3GHD) 'DE4'1C) H1A9 ,H/) 'D*BJJE H*-BJB 'D9/'D) H'D4A'AJ) AJ 9EDJ'* 'D*-CJE H%9D'F 'DF*'&,.",
    goals: [
      "%/'1) 'D,'&2) %DC*1HFJK' (4CD EH-/ HEF8E.",
      "'3*B('D H*BJJE 'DE4'1C'* 9(1 E9'JJ1 H'6-).",
      "*92J2 'D4A'AJ) H,H/) 9EDJ'* 'D*-CJE.",
      "F41 +B'A) 'D*EJ2 H*4,J9 'D#/'! 'DE*EJ2 (JF 'DEH8AJF."
    ],
    features: [
      "*B/JE 'DE4'1C'* %DC*1HFJK' /HF E3*F/'* H1BJ).",
      "1A9 ,H/) HE5/'BJ) 9EDJ'* 'D*-CJE.",
      "%*'-) **(9 -'D) 'DE4'1C) HF*'&,G'.",
      "*14J-'* *BJJE %DC*1HFJ DH-'* E*'(9) D,F) 'D*-CJE."
    ],
    costsave: [
      "*BDJD *C'DJA 'D*-CJE 'DH1BJ H'D',*E'9'* 'D*BDJ/J).",
      ".A6 'DHB* H'DEH'1/ 'DD'2E) DE9'D,) 'DE4'1C'*.",
      "1A9 CA'!) %/'1) 'D,'&2) H*92J2 'D'3*./'E 'D#E+D DDEH'1/."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/award.jpeg"
    ]
  },

  {
    id: "cars",
    name: "5J'F) 'D3J'1'*",
    category: "*-3JF 'D9EDJ'* 'D*4:JDJ)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "JO9/ F8'E 5J'F) 'D3J'1'* EF5) %DC*1HFJ) *O9FI (%/'1) 9EDJ'* 'D5J'F) 'D/H1J) H'D*5-J-J) D#37HD E1C('* 'D#E'F) EF .D'D *3,JD 'D7D('* H,/HD) #9E'D 'D5J'F) HE*'(9) *FAJ0G' H1(7G' (3,D'* 'DE1C('* (E' J3GE AJ 1A9 CA'!) 'D*4:JD H*BDJD 'D#97'D 'DEA',&).",
    goals: [
      "*F8JE HE*'(9) #9E'D 5J'F) 'DE1C('*.",
      "1A9 ,'G2J) 'DE1C('* H*BDJD 'D#97'D.",
      "1A9 CA'!) %/'1) #37HD E1C('* 'D#E'F) H*-3JF ,H/) 'D5J'F)."
    ],
    features: [
      "**(9 -'D'* 'DE1C('* H,/HD) 'D5J'F).",
      "*H+JB 9EDJ'* 'D5J'F) H3,D 'D#97'D.",
      "*B'1J1 9F *C'DJA 'D5J'F) H3'9'* 'D9ED.",
      "3,D #97'D ,/'HD 5J'F) *F(JG'* E*'(9) 'DHBH/."
    ],
    costsave: [
      "*BDJD *C'DJA 'D#97'D H'D5J'F) 'D7'1&).",
      "%7'D) 'D9E1 'D'A*1'6J DDE1C('* 9(1 'D5J'F) 'DHB'&J).",
      "1A9 CA'!) '3*./'E 'DEH'1/ 'DAFJ) H'DE'DJ)."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/cars.png"
    ]
  },

  {
    id: "law",
    name: "'DEF5) 'DB'FHFJ)",
    category: "'D4A'AJ) H'D-HCE)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "JB/E F8'E 'D%/'1) 'DB'FHFJ) EF8HE) %DC*1HFJ) E*C'ED) D%/'1) 'DB6'J' H'D9BH/ H'DE0C1'* H'D'3*4'1'* 'DB'FHFJ) /'.D 'D#E'F) H0DC EF .D'D *3,JD 'DB6'J' HE1'-DG' HE*'(9) 'D,D3'* H%/'1) 'DE3*F/'* 'DB'FHFJ) (E' J6EF *H+JBK' C'EDK' H3GHD) '3*1,'9 'DE9DHE'* 9F/ 'D-',).",
    goals: [
      "*F8JE %/'1) 'DB6'J' H'D9BH/ /'.D 'D#E'F).",
      "*-3JF E*'(9) 3J1 'D,D3'* H'DE1'A9'*.",
      "*H+JB 'D(J'F'* 'DB'FHFJ) H3GHD) 'D1,H9 %DJG' 9F/ 'D-',).",
      "*92J2 'D4A'AJ) H'D/B) AJ %/'1) 'DEDA'* 'DB'FHFJ)."
    ],
    features: [
      "*H+JB 'DB6'J' H'D9BH/ H'D'3*4'1'*.",
      "E*'(9) 'D,D3'* H'DEH'9J/ H'DE1'A9'*.",
      "%/'1) 'DE3*F/'* 'DB'FHFJ) H1(7G' ('DEDA'*.",
      "*3,JD 'DE3*AJ/JF *5FJA 'DB6'J' ,D3'* 9BH/ '3*4'1'*."
    ],
    costsave: [
      "'D-/ EF AB/'F 'DEDA'* 'DH1BJ) H*BDJD *C'DJA 'D7('9) H'D-A8.",
      "*14J/ 'D,G/ H'DHB* 'DE(0HD AJ E*'(9) 'DB6'J'.",
      "*BDJD 'D#.7'! 'D%,1'&J) 'DF'*,) 9F 'D9ED 'DJ/HJ.",
      "1A9 CA'!) 'DE*'(9) 'DB'FHFJ) EE' JF9C3 9DI -A8 -BHB 'D,G)."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: [
      "assets/law.png"
    ]
  },

  {
    id: "reward",
    name: "EC'A#) 'DE1'B(JF",
    category: "'D4A'AJ) H'D-HCE)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "F8'E D-3'( EC'A"* 'DE1'B(JF (F'!K 9DI 'DEG'E 'DEJ/'FJ) 'DEFA0) (-J+ J*E 1(7 'DEC'A"* A9DJK' (CEJ) HFH9J) 'D#9E'D 'DEF,2) EE' J6EF 9/'D) 'D*H2J9 H1A9 E3*HI 'D'D*2'E ('D#/'! H*H+JB 'D#9E'D (4CD 1BEJ EH+HB.",
    goals: [
      "*-BJB 'D9/'D) AJ '-*3'( 'DEC'A"*.",
      "1(7 'DEC'A"* ('D#/'! 'DA9DJ H'DEG'E 'DEF,2).",
      "*-AJ2 'DE1'B(JF 9DI *-3JF ,H/) HCA'!) 'D9ED 'DEJ/'FJ."
    ],
    features: [
      "*3,JD 'DEG'E 'DEJ/'FJ) H1(7G' ('DE1'B(JF.",
      "'-*3'( 'DFB'7 #H 'DBJE (F'!K 9DI %F,'2 'DEG'E.",
      "*B'1J1 #/'! 'DE1'B(JF HE3*HI 'D%F,'2.",
      "*3,JD 'DEG'E FB'7 *B'1J1 #/'!."
    ],
    costsave: [
      "6(7 E51HA'* 'DEC'A"* H'D-/ EF 'D51A :J1 'D9'/D.",
      "*BDJD 'D#.7'! 'DJ/HJ) AJ '-*3'( 'DEC'A"*.",
      "1A9 CA'!) %/'1) 'DEH'1/ 'DE'DJ) 'DE1*(7) ('DEC'A"*."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: [
      "assets/reward.png"
    ]
  },

  {
    id: "ecard",
    name: "'D*HBJ9 'D%DC*1HFJ",
    category: "*-3JF *,1() 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "J*J- G0' 'DF8'E DDEH8AJF %/.'D (J'F'*GE HH3'&D 'D*H'5D 'D.'5) (GE D%F*', *HBJ9 %DC*1HFJ EH-/ J*H'AB E9 'DGHJ) 'DE$33J) DD#E'F) (-J+ JECF '3*./'EG AJ 'DE1'3D'* 'D13EJ) 9(1 'D(1J/ 'D%DC*1HFJ E9 %(1'2 49'1 HGHJ) 'D,G) (4CD '-*1'AJ.",
    goals: [
      "*3GJD %F4'! 'D*HBJ9 'D13EJ DDEH8AJF.",
      "*H-J/ 4CD 'D*HBJ9 HAB 'DGHJ) 'DE$33J).",
      "*92J2 'DGHJ) 'DE$33J) AJ 'DE1'3D'* 'D%DC*1HFJ)."
    ],
    features: [
      "%F4'! *HBJ9 EH-/ DDEH8AJF.",
      "%6'A) 'D(J'F'* 'DH8JAJ) HH3'&D 'D*H'5D.",
      "*H'AB E9 #F8E) 'D(1J/ 'D%DC*1HFJ.",
      "FE'0, *HBJ9 EH-/) (J'F'* '*5'D *-EJD 'D5H1)."
    ],
    costsave: [
      "*BDJD 'D'9*E'/ 9DI *5EJE *HBJ9'* (4CD A1/J.",
      "'.*5'1 'DHB* 'DD'2E D'9*E'/ 'D*HBJ9 H*-/J+G.",
      "1A9 CA'!) 'D%,1'!'* 'D%/'1J) 'DE1*(7) ('DE1'3D'*."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/ecard.png"
    ]
  },

  {
    id: "card",
    name: "*GF&) 'D#9J'/",
    category: "*-3JF 'D*H'5D",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "*HA1 EF5) 'D*G'FJ ./E) %DC*1HFJ) D%13'D 13'&D 'D*GF&) AJ 'D#9J'/ H'DEF'3('* DEH8AJ 'D#E'F) #H 41C'&G' ('3*./'E BH'D( *5EJEJ) E*H'AB) E9 'DGHJ) 'D(51J) EE' J3GE AJ *92J2 1H- 'D'F*E'! H'D*H'5D 'D%F3'FJ /'.D (J&) 'D9ED.",
    goals: [
      "*ECJF 'DEH8AJF EF %13'D 'D*G'FJ %DC*1HFJK'.",
      "*92J2 +B'A) 'D*H'5D 'D%F3'FJ /'.D 'D,G).",
      "*H-J/ GHJ) 'D13'&D H'D*G'FJ 'D13EJ)."
    ],
    features: [
      "%F4'! (7'B'* *GF&) %DC*1HFJ) ('DGHJ) 'DE$33J).",
      "%6'A) #3E'! 'DEGF&JF H'DEGF#JF.",
      "E4'1C) 'D(7'B'* 9(1 'DBFH'* 'DE.*DA).",
      "*5'EJE (7'B'* '.*J'1 9('1'* E4'1C)."
    ],
    costsave: [
      "'D'3*:F'! 9F 'D(7'B'* 'DH1BJ) 'D*BDJ/J).",
      "*BDJD 'D,G/ AJ %9/'/ H*5EJE 13'&D 'D*GF&) J/HJK'.",
      "*92J2 'D'3*./'E 'D#E+D DDEH'1/ 'D*BFJ) 'DE*'-)."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/card.png"
    ]
  },

  {
    id: "tomor",
    name: "EG1,'F *EH1 'D#-3'! 'DE5FQ9)",
    category: "*-3JF *,1() 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "EF5) %DC*1HFJ) D%/'1) A9'DJ'* EG1,'F *EH1 'D#-3'! 'DE5FQ9) *4ED 'D*3,JD DDE4'1CJF -,2 'D#1C'F %5/'1 'D*5'1J- H,/HD) 'DA9'DJ'* (G/A *F8JE 'DEG1,'F H1A9 E3*HI *,1() 'D2H'1 H'DE4'1CJF.",
    goals: [
      "*F8JE %,1'!'* 'D*3,JD H'DE4'1C) AJ 'DEG1,'F.",
      "1A9 CA'!) %/'1) 'DA9'DJ'* H'D#1C'F.",
      "*-3JF *,1() 'D2H'1 H'DE4'1CJF AJ 'DEG1,'F."
    ],
    features: [
      "*3,JD 'DE4'1CJF H'D9'16JF %DC*1HFJK'.",
      "%/'1) 'D#1C'F H'D-,H2'* H'D*5'1J-.",
      ",/HD) 'DA9'DJ'* H'D#F47) 'DE5'-().",
      "*3,JD -,H2'* *5'1J- A9'DJ'*."
    ],
    costsave: [
      "*BDJD 'D,G/ AJ 'D*F8JE 'DJ/HJ DDEG1,'F.",
      "*BDJD 'D#.7'! AJ 'D*3,JD H'D-,H2'*.",
      "1A9 CA'!) '3*:D'D 'DEH'1/ 'DE*'-) DDA9'DJ'*."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/tomor.png"
    ]
  },

  {
    id: "portal",
    name: "'D(H'() 'D%DC*1HFJ)",
    category: "*-3JF *,1() 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "(H'() EH-/) D916 H'DH5HD %DI 'D./E'* 'D1BEJ) 'D*J *B/EG' 'D#E'F) DDE3*AJ/JF (-J+ *OECQPFGE EF '3*91'6 'D./E'* H'D*B/JE 9DJG' %DC*1HFJK' H**(9 -'D) 'D7D('* (3GHD) HH6H-.",
    goals: [
      "*,EJ9 'D./E'* AJ (H'() EH-/).",
      "*3GJD 'DH5HD DD./E'* 'D%DC*1HFJ) DD#E'F).",
      "*-3JF *,1() 'DE3*AJ/ AJ 'D*9'ED E9 'D./E'*."
    ],
    features: [
      "916 'D./E'* H*A'5JDG' H1H'(7G'.",
      "%*'-) 'D*B/JE 9DI 'D./E'* %DC*1HFJK'.",
      "E*'(9) -'D) 'D7D('* H%49'1'* 'D*-/J+.",
      "B'&E) ./E'* 1H'(7 *5FJA'*."
    ],
    costsave: [
      "*BDJD 'D-',) DE1',9) EB1'* 'D#E'F) -6H1JK'.",
      ".A6 'D*C'DJA 'D*4:JDJ) 'DE1*(7) (*B/JE 'D./E) J/HJK'.",
      "1A9 CA'!) E9'D,) 'D7D('* 9(1 'D#*E*)."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/portal.png"
    ]
  },

  {
    id: "paperless",
    name: "#E'F) (D' H1B",
    category: "*-3JF 'D9EDJ'* 'D*4:JDJ)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "E('/1) H#F8E) *G/A %DI *BDJD 'D'9*E'/ 9DI 'DH1B AJ E9'ED'* 'D#E'F) EF .D'D 'D*-HD %DI #F8E) 1BEJ) H#14A) %DC*1HFJ) H*HBJ9'* 1BEJ) (E' J3GE AJ *31J9 'D%,1'!'* H-A8 'D(J&).",
    goals: [
      "*BDJD '3*./'E 'DH1B AJ 'DE9'ED'* 'DJHEJ).",
      "F41 +B'A) 'D*-HD 'D1BEJ /'.D 'D#E'F).",
      "1A9 CA'!) 'D%,1'!'* H319) %F,'2 'DE9'ED'*."
    ],
    features: [
      "*-HJD 'DFE'0, 'DH1BJ) %DI %DC*1HFJ).",
      "/9E 'D*HBJ9 'D%DC*1HFJ H'D#14A) 'D1BEJ).",
      "E*'(9) E$41'* '3*./'E 'DH1B.",
      "FE'0, %DC*1HFJ) *HBJ9 1BEJ #14A)."
    ],
    costsave: [
      ".A6 *C'DJA 41'! 'DH1B H'D#-('1.",
      "*BDJD *C'DJA 'D*.2JF H'DFBD DD#14JA 'DH1BJ.",
      "'DE3'GE) AJ -A8 'D(J&) H'D-/ EF 'DG/1."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/paperless.png"
    ]
  },

  {
    id: "athat",
    name: "'D#+'+ 'D*'DA",
    category: "*-3JF 'D9EDJ'* 'D*4:JDJ)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "F8'E D%/'1) 9EDJ'* -51 'D#+'+ 'D*'DA H'D#5HD :J1 'D5'D-) DD'3*./'E /'.D 'D#E'F) H7D('* 'D'3*(/'D #H 'D*.1J/ (G/A *F8JE 'D#5HD H'D'3*A'/) 'DE+DI EFG'.",
    goals: [
      "*F8JE 9EDJ'* -51 'D#+'+ 'D*'DA.",
      "*31J9 %,1'!'* 'D'3*(/'D #H 'D*.1J/.",
      "1A9 CA'!) %/'1) 'D#5HD AJ 'D#E'F)."
    ],
    features: [
      "*3,JD B79 'D#+'+ 'D*'DA) HEH'B9G'.",
      "7D('* '3*(/'D #H *.1J/ %DC*1HFJ).",
      "*H+JB 'DB1'1'* H'D%,1'!'* 'DEFA0).",
      "FE'0, -51 7D('* *B'1J1 *'DA."
    ],
    costsave: [
      "*BDJD 'DG/1 AJ 41'! #+'+ /HF -',) A9DJ).",
      "*-3JF 'D'3*A'/) EF 'D#5HD 'DEH,H/).",
      "1A9 CA'!) 'D*.7J7 H'D%FA'B 9DI 'D#+'+."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/athat.jpeg"
    ],
  },

  {
    id: "invest",
    name: "EF5) 'D*EJ2 'D'3*+E'1J",
    category: "*-3JF *,1() 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "EF5) D/9E H*ECJF 'DE3*+E1JF EF 'D'7D'9 9DI 'DA15 'D'3*+E'1J) ('D#E'F) H*B/JE 7D('* 'D'3*+E'1 HE*'(9*G' %DC*1HFJK' EE' J922 'D4A'AJ) HJ2J/ EF CA'!) ,0( 'D'3*+E'1'*.",
    goals: [
      "*92J2 ,'0(J) (J&) 'D'3*+E'1 AJ 'D#E'F).",
      "*3GJD 1-D) 'DE3*+E1 AJ 'D*B/JE H'DE*'(9).",
      "1A9 'D4A'AJ) AJ 916 'DA15 'D'3*+E'1J)."
    ],
    features: [
      "916 'DA15 'D'3*+E'1J) HEH'5A'*G'.",
      "'3*B('D 7D('* 'DE3*+E1JF %DC*1HFJK'.",
      "E*'(9) -'D) 'D7D('* H'DEF'A3'*.",
      "A15 EF'A3'* *B'1J1 9BH/."
    ],
    costsave: [
      "*BDJD 'DHB* H'D,G/ AJ %,1'!'* 'D'3*+E'1 'D*BDJ/J).",
      "1A9 CA'!) '3*:D'D 'D#5HD 'D'3*+E'1J).",
      "*-3JF 'D%J1'/'* EF .D'D %/'1) #A6D DDA15."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/invest.jpeg"
    ]
  },


  {
    id: "sharek",
    name: "4'1C",
    category: "*-3JF 'D*H'5D",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "JO9/ F8'E 4'1C EF5) /'.DJ) D1A9 'DEDA'* HE4'1C*G' (JF EH8AJ 'D#E'F) (4CD "EF HEF8E (E' J3GE AJ *3GJD 'D9ED 'D,E'9J H*BDJD 'D'9*E'/ 9DI 'D(1J/ AJ *('/D 'DEDA'*.",
    goals: [
      "*ECJF 'DEH8AJF EF 1A9 'DEDA'* HE4'1C*G' %DC*1HFJK'.",
      "*BDJD '2/H',J) 'DEDA'* H*9// 'DF3..",
      "*-3JF 'D*9'HF (JF 'D%/'1'* H'DA1B."
    ],
    features: [
      "1A9 'DEDA'* H*F8JEG' AJ E,D/'*.",
      "*-/J/ 5D'-J'* 'DH5HD H'DE4'1C).",
      "E*'(9) 'D*9/JD'* H'D%5/'1'*.",
      "E,D/'* E4*1C) 5D'-J'* 1H'(7 E4'1C)."
    ],
    costsave: [
      "*E (F'! 'DF8'E ('3*./'E EH'1/ *BFJ) /'.DJ) /HF 13HE *1.J5 .'1,J).",
      "*BDJD 'D'9*E'/ 9DI -DHD *.2JF .'1,J) E/AH9).",
      "1A9 CA'!) E4'1C) 'DEDA'* /'.DJK'."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/sharek.jpeg"
    ]
  },

  {
    id: "kacd",
    name: "E/JF) 'DEDC 9(/'DDG DD*EH1",
    category: "*-3JF *,1() 'DE3*AJ/",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "EF5) D%/'1) E1'AB 'DE/JF) H*B/JE ./E'* DD*,'1 H'DE3*+E1JF H'D2H'1 (E' J4ED -,2 'DEH'B9 *F8JE 'DA9'DJ'* H*3GJD 'D./E'* 'D*4:JDJ) 'DE*9DB) ('D*EH1.",
    goals: [
      "*F8JE '3*./'E E1'AB E/JF) 'D*EH1.",
      "*3GJD 'D./E'* DD*,'1 H'DE3*+E1JF H'D2H'1.",
      "1A9 ,H/) *4:JD 'DE/JF) HA9'DJ'*G'."
    ],
    features: [
      "%/'1) -,H2'* 'DEH'B9 H'D./E'*.",
      "*F8JE 'DA9'DJ'* H'D#F47).",
      "E*'(9) 9BH/ 'D'F*A'9 H'D./E'*.",
      "-,H2'* 9BH/ A9'DJ'* ./E'*."
    ],
    costsave: [
      ".A8 'D,G/ 'DEJ/'FJ H'D*F8JE 'DJ/HJ."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/kacd.png"
    ]
  },

  {
    id: "mardam",
    name: "'DE1/E",
    category: "*-3JF 'D9EDJ'* 'D*4:JDJ)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "*G/A EF5) 'DE1/E %DI *F8JE 9EDJ'* /.HD E.DA'* 'DG/E H'D1/E %DI 'DEH'B9 'DE.55) HE*'(9) 'D4'-F'* H'D3,D'* 'DE1*(7) (G' DD-/ EF 'D1EJ 'D94H'&J H*-3JF 'D1B'().",
    goals: [
      "*F8JE /.HD 'DE.DA'* %DI EH'B9 'D1/E 'DE9*E/).",
      "E*'(9) 'D4'-F'* H'D*-EJD'*.",
      "'D-/ EF 'D1EJ 'D94H'&J DDE.DA'*."
    ],
    features: [
      "*3,JD 'D4'-F'* H'DED'C.",
      "%5/'1 *5'1J- 'D/.HD DDEH'B9.",
      "E*'(9) 'DCEJ'* H#E'CF 'D1/E.",
      "(H'('* *5'1J- **(9."
    ],
    costsave: [
      "6(7 9EDJ'* 'DFBD H'D1/E H*BDJD 'DG/1.",
      "*-3JF '3*:D'D EH'B9 'D1/E.",
      "*BDJD *C'DJA E9'D,) 'DE.DA'* 'D94H'&J)."
    ],
    beneficiaries: [
      "'DE3*AJ/JF"
    ],
    images: [
      "assets/mardam.png"
    ]
  },

  {
    id: "kpi",
    name: "EF8HE) 'D'3*1'*J,J) H'D#/'!",
    category: "*-3JF 'D9EDJ'* 'D*4:JDJ)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "**J- EF8HE) 'D'3*1'*J,J) H'D#/'! E*'(9) *FAJ0 'D.77 H'DE('/1'* H'DE4'1J9 AJ 'D#E'F) EF .D'D E$41'* #/'! HDH-'* E*'(9) *3'9/ AJ '*.'0 'DB1'1 H*-3JF 'DF*'&,.",
    goals: [
      "E*'(9) *FAJ0 'D'3*1'*J,J) H'D.77.",
      "BJ'3 #/'! 'D%/'1'* H'DE('/1'*.",
      "/9E '*.'0 'DB1'1 (F'!K 9DI E$41'* H'6-)."
    ],
    features: [
      "*91JA 'DE$41'* H1(7G' ('D#G/'A.",
      "DH-'* E*'(9) HEB'1F'* #/'!.",
      "1(7 ('DE('/1'* H'DE4'1J9.",
      "DH-'* E$41'* .77 *FAJ0J) %/'1) E.'71."
    ],
    costsave: [
      "*-3JF CA'!) '*.'0 'DB1'1 H*BDJD 'DB1'1'* :J1 'DE(FJ) 9DI (J'F'*.",
      "*BDJD 'DG/1 'DF'*, 9F 'DE4'1J9 69JA) 'D#+1.",
      "1A9 CA'!) 'D%FA'B 9DI 'DE('/1'*."
    ],
    beneficiaries: [
      "EH8AH 'D#E'F)"
    ],
    images: [
      "assets/kpi.png"
    ]
  },

  {
    id: "fin",
    name: "F8'E %/'1) 'DH+'&B 'DE'DJ)",
    category: "%/'1) 'DH+'&B 'D#14A)",
    owner: "'D%/'1) 'D9'E) DD9EDJ'* 'D1BEJ) H*4:JD (D/J",
    description: "EF5) D%/'1) 'DH+'&B H'DE9'ED'* 'DE'DJ) HAB 'D%,1'!'* 'DE9*E/) *4ED #H'E1 'D/A9 H'DAH'*J1 H3F/'* 'D51A H:J1G' E9 *HAJ1 #14A) %DC*1HFJ) DG'.",
    goals: [
      "*F8JE E9'ED'* HH+'&B 'DE'DJ).",
      "*3GJD 'DH5HD DDH+'&B 9F/ 'D-',).",
      "1A9 /B) H319) %F,'2 'DE9'ED'* 'DE'DJ)."
    ],
    features: [
      "*3,JD H#14A) #H'E1 'D/A9 H'DAH'*J1.",
      "E*'(9) -'D) 'DE9'ED'* 'DE'DJ).",
      "%5/'1 *B'1J1 E'DJ) E3'F/).",
      "#14A) E'DJ) #H'E1 /A9 AH'*J1 */BJB."
    ],
    costsave: [
      "*BDJD 'D#.7'! 'DE'DJ) H'D*#.J1."
    ],
    beneficiaries: ["EH8AH 'D#E'F)"],
    images: [
      "assets/fin.png"
    ]
  }
];



// 9F'51 DOM
const platformList = document.getElementById("platformList");
const platformDetails = document.getElementById("platformDetails");
const searchInput = document.getElementById("searchInput");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let selectedPlatform = null;

// *GJ&) 'DB'&E)
function renderPlatformList(filter = "") {
  platformList.innerHTML = "";
  const query = filter.trim().toLowerCase();

  const filtered = platforms.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "D' *H,/ EF5'* E7'(B) D(-+C.";
    platformList.appendChild(li);
    return;
  }

  filtered.forEach((platform) => {
    const li = document.createElement("li");
    li.dataset.id = platform.id;

    const nameEl = document.createElement("div");
    nameEl.className = "platform-name";
    nameEl.textContent = platform.name;

    const tagEl = document.createElement("div");
    tagEl.className = "platform-tag";
    tagEl.textContent = platform.category;

    li.appendChild(nameEl);
    li.appendChild(tagEl);

    li.addEventListener("click", () => {
      document
        .querySelectorAll("#platformList li")
        .forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
      showPlatformDetails(platform.id);
      botReply(
        `*E '.*J'1 **${platform.name}**.\nJECFFJ *2HJ/C ('D#G/'A 'DE2'J' 'DE3*AJ/JF #H E$41'* 'D#/'! 'D.'5) (G'.`
      );
    });

    platformList.appendChild(li);
  });
}

// 916 *A'5JD EF5)
function showPlatformDetails(id) {
  const platform = platforms.find((p) => p.id === id);
  if (!platform) return;
  selectedPlatform = platform;

  platformDetails.innerHTML = `
    <h2>${platform.name}</h2>
    <div class="platform-meta">
      <span class="badge">'DA&): ${platform.category}</span>
      <span class="badge">'D,G) 'DE'DC): ${platform.owner}</span>
    </div>

    <p>${platform.description}</p>

    <div>
      <div class="section-title">'D#G/'A 'D1&J3J)</div>
      <ul>
        ${platform.goals.map((g) => `<li>${g}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">#(12 'DE2'J'</div>
      <ul>
        ${platform.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">*-BJB CA'!) 'D#FA'B</div>
      <ul>
        ${platform.costsave.map((k) => `<li>${k}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-title">'DA&'* 'DE3*AJ/)</div>
      <div class="tag-list">
        ${platform.beneficiaries.map((b) => `<span>${b}</span>`).join("")}
      </div>
    </div>

    <div>
      <div class="section-title">5H1 EF 'DEF5)</div>
      <div class="images-grid">
        ${
          platform.images && platform.images.length
            ? platform.images
                .map(
                  (src) =>
                    `<img src="${src}" alt="5H1) EF ${platform.name}" />`
                )
                .join("")
            : "<span>DE J*E %6'A) 5H1 (9/.</span>"
        }
      </div>
    </div>
  `;
}

// F8'E 13'&D (3J7

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = text.replace(/\n/g, "<br>");
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(text) {
  addMessage(text, "bot");
}

function handleUserMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";

  // EF7B (3J7 JAGE (96 'D#3&D) ('D91(J
  const lower = text.toLowerCase();

  // %0' 3#D 9F EF5) ('D'3E
  const foundPlatform = platforms.find((p) =>
    lower.includes(p.name.toLowerCase())
  );

  if (foundPlatform) {
    showPlatformDetails(foundPlatform.id);
    botReply(
      `G0' ED.5 9F **${foundPlatform.name}**:\n- 'DA&): ${foundPlatform.category}\n- #GE G/A: ${foundPlatform.goals[0]}\nJECFC #J6K' '.*J'1G' EF 'DB'&E) DE4'G/) 'DE2J/ EF 'D*A'5JD H'D5H1.`
    );
    return;
  }

  if (!selectedPlatform) {
    botReply(
      "A6DK' '.*1 EF5) EF 'DB'&E) #HD'K #H '0C1 '3E 'DEF5) AJ 3$'DC D#*ECF EF E3'9/*C (4CD #/B. =
"
    );
    return;
  }

  // #3&D) -3( 'DCDE'*
  if (lower.includes("G/A") ||
      lower.includes("'DG/A") ||
      lower.includes("JG/A") ||
      lower.includes("*G/A")||
      lower.includes("'G/'A")||
      lower.includes("'D'G/'A 'D1&J3J)")||
      lower.includes("'DA'&/)")
      
     
     ) {
    botReply(
      `'D#G/'A 'D1&J3J) DEF5) **${selectedPlatform.name}**:\n- ${selectedPlatform.goals.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("EJ2)") ||
    lower.includes("EJ2G") ||
    lower.includes("'DE2'J'") ||
    lower.includes("EJ2'*") ||
    lower.includes("E2'J'") ||
    lower.includes("EEJ2'*")
  ) {
    botReply(
      `#(12 'DE2'J' AJ EF5) **${selectedPlatform.name}**:\n- ${selectedPlatform.features.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("*14J/") ||
    lower.includes("*-3JF") ||
    lower.includes("CA'!) 'FA'B")||
    lower.includes("CA'!) 'D'FA'B")||
    lower.includes("CA'!)")||
    lower.includes("CA'!) 'D51A ")||
    lower.includes("'DCA'!) 'DE'DJ)")||
    lower.includes("'D'FA'B")||
    lower.includes("CA'!) 'D'FA'B")||
    lower.includes("'DEJ2'FJ)")
      
      
  ) {
    botReply(
      `CJA J*E *14J/ 'DFAB'* 'DE'DJ) **${selectedPlatform.name}**:\n- ${selectedPlatform.costsave.join(
        "\n- "
      )}`
    );
  } else if (
    lower.includes("E3*AJ/") ||
    lower.includes("E3*AJ/JF") ||
    lower.includes("9EHE") ||
    lower.includes("'DE3*AJ/JF") ||
    lower.includes("'DE3*AJ/") ||
    lower.includes(",G)")||
    lower.includes("E3*AJ/HF")
    
  ) {
    botReply(
      `'DA&'* 'DE3*AJ/) EF EF5) **${selectedPlatform.name}**:\n- ${selectedPlatform.beneficiaries.join(
        "\n- "
      )}`
    );
  } else if (lower.includes("5H1)") || lower.includes("5H1")) {
    if (selectedPlatform.images && selectedPlatform.images.length) {
      botReply(
        `*E 916 5H1 EF5) **${selectedPlatform.name}** AJ B3E 'D*A'5JD 9DI 'DJ3'1. JECFC '3*91'6 H',G'* 'DEF5) GF'C. =�`
      );
    } else {
      botReply(
        `D' *H,/ 5H1 E6'A) -'DJK' DEF5) **${selectedPlatform.name}** JECF D'-BK' %6'A) DB7'* 4'4) DDEF5) D%+1'! 'D*,1() 'D(51J).`
      );
    }
  } else {
    botReply(
      `#3*7J9 *2HJ/C (E9DHE'* 9F 'D#G/'A 'DE2'J' 'DE3*AJ/JF E$41'* 'D#/'! #H 'D5H1 DEF5) **${selectedPlatform.name}**.\n,1Q( E+DK': "E' GJ #G/'A 'DEF5)" #H "EF 'DE3*AJ/ EF G0G 'DEF5)" `
    );
  }
}

// 'D#-/'+

searchInput.addEventListener("input", (e) =>
  renderPlatformList(e.target.value)
);

sendBtn.addEventListener("click", handleUserMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserMessage();
  }
});

// *4:JD #HDJ
renderPlatformList();
