document.addEventListener("DOMContentLoaded", () => {
  const addDeviceForm = document.getElementById("addDeviceForm");
  const devicesList = document.getElementById("devicesList");
  const searchInput = document.getElementById("searchInput");

  if (addDeviceForm) {
    addDeviceForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(addDeviceForm);
      const data = {
        deviceName: formData.get("deviceName"),
        adresseIp: formData.get("adresseIp"),
        adresseMac: formData.get("adresseMac"),
      };

      try {
        const response = await fetch("/api/devices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Device added successfully!");
          addDeviceForm.reset();
        } else {
          alert("Error adding device.");
        }
      } catch (error) {
        console.error("Error adding device:", error);
        alert("Error adding device.");
      }
    });
  }

  if (devicesList) {
    const fetchDevices = async (query = "") => {
      try {
        const response = await fetch(`/api/devices?query=${query}`);
        const devices = await response.json();
        devicesList.innerHTML = "";
        devices.forEach((device) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>Name:</strong> ${device.deviceName}
            <button class="toggle-ip">Show IP</button>
            <span class="ip" style="display:none;">${device.adresseIp}</span>
            <button class="toggle-mac">Show MAC</button>
            <span class="mac" style="display:none;">${device.adresseMac}</span>
          `;
          devicesList.appendChild(listItem);

          listItem.querySelector(".toggle-ip").addEventListener("click", () => {
            const ipSpan = listItem.querySelector(".ip");
            if (ipSpan.style.display === "none") {
              ipSpan.style.display = "inline";
              listItem.querySelector(".toggle-ip").textContent = "Hide IP";
            } else {
              ipSpan.style.display = "none";
              listItem.querySelector(".toggle-ip").textContent = "Show IP";
            }
          });

          listItem.querySelector(".toggle-mac").addEventListener("click", () => {
            const macSpan = listItem.querySelector(".mac");
            if (macSpan.style.display === "none") {
              macSpan.style.display = "inline";
              listItem.querySelector(".toggle-mac").textContent = "Hide MAC";
            } else {
              macSpan.style.display = "none";
              listItem.querySelector(".toggle-mac").textContent = "Show MAC";
            }
          });
        });
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();

    searchInput.addEventListener("input", () => {
      const query = searchInput.value;
      fetchDevices(query);
    });
  }
});