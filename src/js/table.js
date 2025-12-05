const formatTable = {
    info: [
        { key: 'time', title: 'Waktu', type: 'time' },
        { key: 'temperature', title: 'Suhu (\u2103)', type: 'number' },
        { key: 'humidity', title: 'Kelembaban (%)', type: 'number' },
    ],
    egg: [
        { key: 'kode', title: 'Kode', type: 'text' },
        { key: 'type', title: 'Jenis', type: 'text' },
        { key: 'quantity', title: 'Jumlah', type: 'number', step: 1, min: 0 },
        { key: 'dateIn', title: 'Tanggal Masuk', type: 'date' },
        { key: 'incubationPeriod', title: 'Lama Incubasi', type: 'number', step: 1, min: 0 },
        { key: 'status', title: 'Status', type: 'text' },

    ],
    incubator: [
        { key: 'startDate', title: 'Mulai Tanggal', type: 'date' },
        { key: 'endDate', title: 'Hingga Tanggal', type: 'date' },
        { key: 'temperature', title: `Suhu (\u2103)`, type: 'number', step: 0.1, min: 0, max: 10 },
        { key: 'humidity', title: 'Kelembaban (%)', type: 'number', step: 1, min: 0, max: 15 },
        { key: 'turner', title: 'Pembalik (Jam)', type: 'number', step: 1, min: 0, max: 24 },
        { key: 'description', title: 'Ketengan', type: 'text' },
    ]
};

const dataSample = {
    info: [
        { time: '12:23', temperature: 35.0, humidity: 55 },
        { time: '12:25', temperature: 35.7, humidity: 58 },
        { time: '12:30', temperature: 36.5, humidity: 59 },
    ],
    egg: [
        { kode: 'AE01', type: 'Ayam Elba', quantity: '20', dateIn: '2025-12-14', incubationPeriod: 21, status: 'incubation' },
        { kode: 'AK01', type: 'Ayam Kampung', quantity: '5', dateIn: '2025-12-20', incubationPeriod: 21, status: 'incubation' },
        { kode: 'AK01', type: 'Ayam Kampung', quantity: '15', dateIn: '2025-12-21', incubationPeriod: 21, status: 'incubation' }
    ],
    incubator: [
        { startDate: "2025-12-01", endDate: "2025-12-03", temperature: 38, humidity: 60, turner: 0, description: "Pembentukan Embrio" },
        { startDate: "2025-11-04", endDate: "2025-11-15", temperature: 38, humidity: 60, turner: 8, description: "Pemerataan nutrisi, suhu pada telur" },
        { startDate: "2025-11-16", endDate: "2025-11-18", temperature: 37.5, humidity: 70, turner: 5, description: "Persiapan penetesan" },
        { startDate: "2025-11-19", endDate: "2025-11-21", temperature: 37.0, humidity: 75, turner: 0, description: "Masa penetasan" }
    ]
};

class AppTable {
    constructor({ header, data, key }) {
        this.header = header;
        this.data = data;
        this.key = key;
    }

    add() {
        const newRow = {};
        this.header.forEach(h => newRow[h.key] = "");
        this.data.push(newRow);
    }

    delete(index) {
        this.data.splice(index, 1);
    }

    getColumnConfig(key) {
        return this.header.find(x => x.key === key) || {};
    }
    getSum(field) {
        return this.data.reduce((sum, row) => sum + Number(row[field]), 0);
    }

    getData() {
        const rows = [...document.querySelectorAll(`.${this.key}`)];
        const result = rows.map(row => {
            const rowObj = {};
            const inputs = [...row.querySelectorAll("input")];
            inputs.forEach((input, i) => {
                const col = this.header[i];
                let val = input.value;

                // Convert number
                if (col.type === "number") val = val.includes(".") ? parseFloat(val) : parseInt(val);

                rowObj[col.key] = val;
            });
            return rowObj;
        });

        console.log("🧾 Extracted Table Data:", result);
        return result;
    }
}


function TableUI({ controller, editTable = false }) {
    const [isEdit, setIsEdit] = useState(false);
    const [rows, setRows] = useState(controller.data);
    const [backup, setBackup] = useState([]);

    function handleChange(rowIndex, key, value) {
        controller.data[rowIndex][key] = value;
        setRows([...controller.data]);
    }

    function toggleEdit() {
        if (!isEdit) {
            // masuk mode edit → simpan snapshot data
            setBackup(JSON.parse(JSON.stringify(rows)));
            setIsEdit(true);
        } else {
            // klik Batal → restore data backup
            controller.data = JSON.parse(JSON.stringify(backup));
            setRows([...controller.data]);
            setIsEdit(false);
        }
    }

    function handleSave() {
        controller.getData();
        setIsEdit(false);
    }

    return [
        h("div", { className: "table-wrapper" },
            h("table", { className: isEdit ? "table-input" : "" }, [
                h("thead", null,
                    h("tr", null,
                        controller.header.map((head, i) =>
                            h("th", { key: i }, head.title)
                        )
                    )
                ),
                h("tbody", null,
                    rows.map((row, rowIndex) =>
                        h("tr", { className: controller.key, key: rowIndex },
                            Object.entries(row).map(([k, v], colIndex) => {
                                const config = controller.getColumnConfig(k);
                                return h("td", { key: `${rowIndex}-${colIndex}` },
                                    isEdit
                                        ? h("input", {
                                            value: v,
                                            type: config.type || "text",
                                            step: config.step,
                                            min: config.min,
                                            max: config.max,
                                            oninput: e => handleChange(rowIndex, k, e.target.value)
                                        })
                                        : v
                                );
                            })
                        )
                    )
                )
            ])
        ),

        // --- BUTTON AREA ---
        editTable ?
            h("div", { className: isEdit ? 'btn-incubator' : 'btn-edit' }, [
                isEdit && h("button", { onclick: () => { controller.add(); setRows([...controller.data]); } }, "Tambah"),
                h("button", { onclick: toggleEdit }, isEdit ? "Batal" : "Ubah"),
                isEdit && h("button", { onclick: handleSave }, "Simpan"),
            ]) : '',
    ];
}
