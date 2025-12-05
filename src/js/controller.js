class AppController {
    constructor(model) {
        this.model = model;
    }



    fetchDashboardData() {
        fetch("/api/data")
            .then((response) => response.json())
            .then((data) => {
                this.model.updateDashboardData(data);
            })
            .catch((error) => {
                console.error("Error fetching dashboard data:", error);
                this.model.updateDashboardData({
                    temperature: 37.5 + (Math.random() - 0.5) * 2,
                    humidity: 65 + (Math.random() - 0.5) * 10,
                    relays: {
                        heater: Math.random() > 0.5 ? "on" : "off",
                        humidifier: Math.random() > 0.5 ? "on" : "off",
                        fan: Math.random() > 0.5 ? "on" : "off",
                        turner: Math.random() > 0.5 ? "on" : "off",
                    },
                    eggs: [
                        {
                            kode: "EGG001",
                            jenis: "Ayam",
                            jumlah: 10,
                            tanggalMasuk: "2023-10-01",
                            tanggalMenetas: "2023-10-21",
                            status: "Incubasi",
                        },
                        {
                            kode: "EGG002",
                            jenis: "Bebek",
                            jumlah: 5,
                            tanggalMasuk: "2023-10-02",
                            tanggalMenetas: "2023-10-25",
                            status: "Penetasan",
                        },
                    ],
                    pir: [
                        {
                            waktu: "10:30",
                            keterangan: "Gerakan terdeteksi",
                            area: "Kiri",
                            jenisAktivitas: "Motor",
                        },
                        {
                            waktu: "11:15",
                            keterangan: "Gerakan terdeteksi",
                            area: "Kanan",
                            jenisAktivitas: "Pengecekan",
                        },
                    ],
                });
            });
    }


    saveSettings(category, data) {
        // Simulate API call
        fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, data }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    this.model.updateSettings(category, data);
                    alert(`Pengaturan ${category} berhasil disimpan.`);
                } else {
                    alert(`Gagal menyimpan pengaturan ${category}: ${result.message}`);
                }
            })
            .catch((error) => {
                console.error("Error saving settings:", error);
                // For demo purposes, update model anyway
                this.model.updateSettings(category, data);
                alert(`Pengaturan ${category} berhasil disimpan (simulasi).`);
            });
    }
}

const controller = new AppController(model)