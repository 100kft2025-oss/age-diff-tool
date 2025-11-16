function calculateDiff() {
  const d1 = document.getElementById("date1").value;
  const d2 = document.getElementById("date2").value;
  const out = document.getElementById("result");

  if (!d1 || !d2) {
    out.innerHTML = "<strong style='color:#b91c1c'>दोनों तारीखें डालें।</strong>";
    return;
  }

  const dateA = new Date(d1);
  const dateB = new Date(d2);

  // If same date
  if (dateA.getTime() === dateB.getTime()) {
    out.innerHTML = "<strong>दोनों तारीखें समान हैं — अंतर 0 दिन है।</strong>";
    return;
  }

  // Ensure dateStart <= dateEnd
  let start = dateA < dateB ? dateA : dateB;
  let end = dateA < dateB ? dateB : dateA;

  // Calculate years, months, days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // previous month days count
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total days difference
  const msPerDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.floor((end - start) / msPerDay);

  // Human readable result
  let res = `<strong>अंतर:</strong> ${years} वर्ष, ${months} महीने, ${days} दिन<br>`;
  res += `<strong>कुल दिन:</strong> ${totalDays} दिन`;

  // Extra: show which date is earlier
  res += `<br><small style="color:#334155">(${formatDate(start)} से ${formatDate(end)} तक)</small>`;

  out.innerHTML = res;
}

// Helpers
function formatDate(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

function swapDates() {
  const a = document.getElementById("date1");
  const b = document.getElementById("date2");
  const temp = a.value;
  a.value = b.value;
  b.value = temp;
  // Recalculate if both present
  if (a.value && b.value) calculateDiff();
}

function clearAll() {
  document.getElementById("date1").value = "";
  document.getElementById("date2").value = "";
  document.getElementById("result").innerHTML = "";
}
