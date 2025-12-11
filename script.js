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
    images: []
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
    images: []
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
    images: []
  }
];

// جلب عناصر الـ DOM
const platformList = document.getElementById("platformList");
const platformDetails = document.getElementById("platformDetails");
const searchInput = document.getElementById("searchInput");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let selectedPlatform = null;

// تهيئة قائمة المنصات
function renderPlatformList(filter = "") {
  if (!platformList) return;

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
        `تم اختيار <strong>${platform.name}</strong>.<br>يمكنني تزويدك بالأهداف، المزايا، المستفيدين أو مؤشرات الأداء الخاصة بها.`
      );
    });

    platformList.appendChild(li);
  });
}

// عرض تفاصيل المنصة
function showPlatformDetails(id) {
  if (!platformDetails) return;

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
            : "<span>لم يتم إضافة صور بعد. في النسخة النهائية، يمكن ربط صور حقيقية للمنصة هنا.</span>"
        }
      </div>
    </div>
  `;
}

// رسائل المحادثة
function addMessage(text, sender = "bot") {
  if (!chatMessages) return;

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(text) {
  addMessage(text, "bot");
}

// معالجة رسالة المستخدم
function handleUserMessage() {
  if (!userInput) return;

  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";

  const lower = text.toLowerCase();
  const foundPlatform = platforms.find((p) =>
    lower.includes(p.name.toLowerCase())
  );

  if (foundPlatform) {
    showPlatformDetails(foundPlatform.id);
    botReply(
      `هذا ملخص عن <strong>${foundPlatform.name}</strong>:<br>- الفئة: ${
        foundPlatform.category
      }<br>- أهم هدف: ${foundPlatform.goals[0]}<br>يمكنك أيضًا اختيارها من القائمة لمشاهدة المزيد من التفاصيل.`
    );
    return;
  }

  if (!selectedPlatform) {
    botReply(
      "فضلًا، اختر منصة من القائمة أولاً أو اذكر اسم المنصة في سؤالك لأتمكن من مساعدتك بشكل أدق. 😊"
    );
    return;
  }

  if (lower.includes("هدف") || lower.includes("أهداف")) {
    botReply(
      `الأهداف الرئيسية لمنصة <strong>${selectedPlatform.name}</strong>:<br>- ${selectedPlatform.goals.join(
        "<br>- "
      )}`
    );
  } else if (
    lower.includes("ميزة") ||
    lower.includes("المزايا") ||
    lower.includes("مميزات")
  ) {
    botReply(
      `أبرز المزايا في منصة <strong>${selectedPlatform.name}</strong>:<br>- ${selectedPlatform.features.join(
        "<br>- "
      )}`
        );
  } else if (
    lower.includes("تحقيق كفاءة انفاق") ||
    lower.includes("ترشيد") ||
    lower.includes("الميزة") ||
    lower.includes("المالية") ||
    lower.includes("وفرة") ||
    lower.includes("وفيره") ||
    lower.includes("توفير") ||
    lower.includes("الانفاق") ||
    lower.includes("الإنفاق") ||
    lower.includes("الأنفاق") ||
    lower.includes("انفاق")  ||
    lower.includes("إنفاق") ||
    lower.includes("أنفاق") ||

  ) {
    botReply(
      `مؤشرات الأداء المرتبطة بمنصة <strong>${selectedPlatform.name}</strong>:<br>- ${selectedPlatform.kpis.join(
        "<br>- "
      )}`
    );
  } else if (
    lower.includes("مستفيد") ||
    lower.includes("مستفيدين") ||
    lower.includes("جهة")
  ) {
    botReply(
      `الفئات المستفيدة من منصة <strong>${selectedPlatform.name}</strong>:<br>- ${selectedPlatform.beneficiaries.join(
        "<br>- "
      )}`
    );
  } else if (lower.includes("صورة") || lower.includes("صور")) {
    botReply(
      `تم عرض صور منصة <strong>${selectedPlatform.name}</strong> (أو مكان عرضها) في قسم التفاصيل على اليمين/اليسار. 📸`
    );
  } else {
    botReply(
      `أستطيع تزويدك بمعلومات عن الأهداف، المزايا، المستفيدين، مؤشرات الأداء أو الصور لمنصة <strong>${selectedPlatform.name}</strong>.<br>جرّبي مثلًا: "ما هي أهداف المنصة؟" أو "من المستفيد من هذه المنصة؟" `
    );
  }
}

// ربط الأحداث بعد تحميل الـ DOM
document.addEventListener("DOMContentLoaded", () => {
  renderPlatformList();

  if (searchInput) {
    searchInput.addEventListener("input", (e) =>
      renderPlatformList(e.target.value)
    );
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", handleUserMessage);
  }

  if (userInput) {
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleUserMessage();
      }
    });
  }
});

