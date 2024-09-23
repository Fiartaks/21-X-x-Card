// Modal ve buton öğelerini seç
const button = document.getElementById("button");
const modal = document.getElementById("container");
const placeholder = document.querySelector(".placeholder");
const editableInput = document.querySelector(".editable");
const tweetButton = document.querySelector(".button");
const counter = document.getElementById("counter");
const readonly = document.querySelector(".readonly");

// Butona tıklandığında modalı aç
button.onclick = function () {
  modal.style.display = "block"; // Modal görünür hale gelir
};

// Modalı kapatmak için temel bir kapatma işlevi ekleyelim
const upgradeButton = document.querySelector(".upgrade");
const laterButton = document.querySelector(".later");

upgradeButton.onclick = function () {
  alert("Yükseltme işlemine geçilecek."); // Burada uygun bir işlem gerçekleştirin
};

laterButton.onclick = function () {
  modal.style.display = "none"; // Modal kapanır
};

// Modal dışına tıkladığımızda modalı kapatmak için bir olay dinleyicisi
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Modal kapanır
  }
};

// Tiklama olayı
editableInput.addEventListener("click", () => {
  placeholder.style.color = "#98a5b1";
});

// Inputun odagını dışarıya tıklanınca kaldırıyor
editableInput.onblur = () => {
  placeholder.style.color = "#333";
};

// Klavyenin basılma olayını dinliyoruz
editableInput.onkeypress = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

// Klavyeden parmağımızı çektiğimiz anda dinliyor
editableInput.onkeyup = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

// Yazılan tweetin karakter kontrolü
const inputValidate = (tweet) => {
  const tweetLength = tweet.length;
  const tweetLimit = 280; // Sınır belirlendi
  const currentLimit = tweetLimit - tweetLength;

  // Karakter var mı?
  if (tweetLength <= 0) {
    // Karakter yoksa
    placeholder.style.display = "block";
    tweetButton.classList.remove("active");
    counter.style.display = "none";
  } else {
    // Karakter varsa
    tweetButton.classList.add("active");
    counter.style.display = "block";
    counter.innerText = currentLimit;

    // Karakter sınırı aşıldı mı?
    if (tweetLength > tweetLimit) {
      // Karakter sınırının aşıldığı durum
      let overTweet = tweet.substr(tweetLimit, tweetLength);
      let overTweetElement = `<span class="overTweet">${overTweet}</span>`;
      newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
      readonly.style.zIndex = "1";
      counter.style.color = "red";
      tweetButton.classList.remove("active"); // Butonu pasif yap

      // Modalı aç
      modal.style.display = "block"; // Modal görünür hale gelir
    } else {
      // Karakter sınırının aşıldığı durum
      counter.style.color = "#fff";
      readonly.style.zIndex = "-5";
    }
  }

  // Oluşan yeni tweeti göstermek için HTML tarafına gönderme
  readonly.innerHTML = newTweet || tweet; // Eğer newTweet yoksa tweeti göster
};
