const { h } = preact;
const { useState, useEffect, useRef } = preactHooks;

function Nav({ onNav }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function handleToggle() {
        setIsMenuOpen(prev => !prev);
    }

    function hancleNav(section) {
        onNav(section);
        setIsMenuOpen(false)
    }
    return h('nav', null,
        h('div', { className: 'container' },
            h('div', { className: 'brand' }, 'Smart Incubator'),
            h('div', { className: isMenuOpen ? 'toggle active' : 'toggle', onClick: handleToggle }, h('span'), h('span'), h('span'),),
            h('div', { className: isMenuOpen ? 'menu active' : 'menu' },
                h('a', { href: '#', onClick: () => hancleNav('home') }, 'Beranda'),
                h('a', { href: '#', onClick: () => hancleNav('setting') }, 'Pengaturan'),
                h('a', { href: '#', onClick: () => hancleNav('auth') }, 'Keluar'),
            ),
        ),
    )
}

function Footer() {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const yearText = startYear === currentYear
        ? startYear
        : `${startYear}-${currentYear}`;
    return h('footer', null,
        h('div', { className: 'footer-content' },
            h('p', null,
                `\u00A9 ${yearText} Smart Incubator By:`,
                h('a', { href: 'https://www.facebook.com/romeodelta89', target: '_blank', rel: 'noopener noreferrer' }, 'Romeo Delta'),
            ),

        ),
    );
}

function CardInfo({ title, value, description }) {
    return h('div', { className: 'card' },
        h('h3', { className: 'info-title' }, title),
        h('div', { className: 'info-value' }, value),
        h('p', { className: 'info-description' }, description),
    );
}

function RelayCard({ relayName, status }) {
    return h('div', { className: 'relay-item' },
        h('span', { className: 'relay-name' }, relayName),
        h('div', { className: `status-circle ${status}` },),
    );
}

function Table({ header, data, idKey = 'id' }) {

    return h('div', { className: 'table-wrapper' },
        h('table', null,
            // HEADERS
            h('thead', null,
                h('tr', null,
                    header.map((title, i) => h('th', { key: `h-${i}` }, title))
                )
            ),
            // BODY ROWS
            h('tbody', null,
                data.map((row, rIndex) => {
                    const rowId = row[idKey] !== undefined && row[idKey] !== null
                        ? row[idKey]
                        : `row-${rIndex}`;
                    return h('tr', { key: rowId },
                        Object.entries(row).map(([key, value], cIndex) => {
                            // if (key === 'temperature') value = `${value} ℃`;
                            // if (key === 'humidity') value = `${value} %`;
                            return h('td', { key: `${rowId}-cell-${cIndex}` }, value);
                        })
                    );
                })
            )
        )
    );
}

function Home() {
    const tHeader = ['Waktu', `Suhu \u2103`, 'Kelembaban %'];
    const tData = [
        { time: '10:12', temperature: 35.6, humidity: 62 },
        { time: '10:15', temperature: 36.0, humidity: 63 },
        { time: '10:18', temperature: 36.5, humidity: 64 }
    ];

    const thTelur =
        ['Kode', 'Jenis', 'Jumlah', 'Tanggal Masuk', 'Tanggal Menetas', 'Status'];
    const tdTelur = [
        { kode: 'T001', type: 'Ayam Kampung', quantity: '10', dateIn: '01/12/2025', dateHatch: '21/12/2025,', status: 'Inkubasi' },
        { kode: 'T002', type: 'Ayam Elba', quantity: '20', dateIn: '06/12/2025', dateHatch: '21/12/2025,', status: 'Inkubasi' },
        { kode: 'T003', type: 'Ayam Bangkok', quantity: '5', dateIn: '12/12/2025', dateHatch: '21/12/2025,', status: 'Inkubasi' },
    ];

    return h('div', { className: 'main-section' },
        h('h1', null, 'Informasi'),
        h('div', { className: 'section' },
            h('div', { className: 'section' },
                h('div', { className: 'section-grid' },
                    h(CardInfo, { title: 'Waktu', value: '12:21', description: 'date' },),
                    h(CardInfo, { title: 'Mode', value: 'Auto', description: 'Ayam Elba' },),
                    h(CardInfo, { title: 'Suhu', value: `36.3 \u2103`, description: 'Target: 38.0' },),
                    h(CardInfo, { title: 'Kelembaban', value: '57 %', description: 'Target: 60' },),
                ),
                h('spacer'),
                h('div', { className: 'section-grid relay' },
                    h(RelayCard, { relayName: 'Pemanas', status: 'on' },),
                    h(RelayCard, { relayName: 'Pelembab', status: 'on' },),
                    h(RelayCard, { relayName: 'Pembalik', status: 'off' },),
                    h(RelayCard, { relayName: 'Kipas', status: 'on' },),
                ),
            ),
            h('spacer'),
            h('div', { className: 'section' },
                h('h2', null, 'Suhu Dan Kelembaban'),
                h(Table, { header: tHeader, data: tData, idKey: 'time' }),
            ),
            h('spacer'),
            h('div', { className: 'section' },
                h('div', { className: 'card-header-row' },
                    h('h2', null, 'Data Telur'),
                    h('div', { className: 'right-group' },
                        h('p', null, 'Jumlah:'),
                        h('p', null, '200'),
                    ),
                ),
                h(Table, { header: thTelur, data: tdTelur, idKey: 'kode' }),
            ),

        ),
    );

}

function SetDatetime() {
    return h('div', { className: 'card' },
        h('h2', null, 'Waktu dan Tanggal'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'setTime' }, 'Waktu'),
                h('input', { type: 'time', id: 'setTime' }),
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'setDate' }, 'Tanggal'),
                h('input', { type: 'date', id: 'setDate' }),
                h('button', null, 'Sync'),
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );

}

function SetIncubator() {
    const incubatorHeader = [
        'Mulai Tanggal',
        'Hingga Tanggal',
        'Suhu (°C)',
        'Kelembaban (%)',
        'Pembalik (jam)',
        'Keterangan'
    ];
    const incData = [
        {
            startDate: "2025-12-01",
            endDate: "2025-12-03",
            temperature: 38,
            humidity: 60,
            turner: 0,
            description: "Pembentukan Embrio"
        },
        {
            startDate: "2025-11-04",
            endDate: "2025-11-15",
            temperature: 38,
            humidity: 60,
            turner: 8,
            description: "Pemerataan nutrisi, suhu pada telur"
        },
        {
            startDate: "2025-11-16",
            endDate: "2025-11-18",
            temperature: 37.5,
            humidity: 70,
            turner: 5,
            description: "Persiapan penetesan"
        },
        {
            startDate: "2025-11-19",
            endDate: "2025-11-21",
            temperature: 37.0,
            humidity: 75,
            turner: 0,
            description: "Masa penetasan"
        }
    ];
    const [isEdit, setIsEdit] = useState(false);
    const [incubatorData, setIncubatorData] = useState(incData);

    function handleCancel() {
        setIncubatorData(incData);
        setIsEdit(false)
    }
    function handleEdit() {
        setIsEdit(prev => !prev);
    }
    function handleAdd() {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0];
        setIncubatorData(prevData => [
            ...prevData,
            {
                startDate: dateString,
                endDate: dateString,
                temperature: "",
                humidity: "",
                turner: "",
                description: ""
            }
        ]);
    }


    const getInputType = (key) => {
        if (key.includes("Date")) return "date";
        if (key === "temperature" || key === "humidity" || key === "turner") return "number";
        return "text";
    };

    // 🔥 EVENT SAVE DATA
    const handleSave = () => {
        const rows = [...document.querySelectorAll(".incRow")];

        const updated = rows.map(row => {
            const inputs = [...row.querySelectorAll("input")];

            return {
                startDate: inputs[0].value,
                endDate: inputs[1].value,
                temperature: Number(inputs[2].value),
                humidity: Number(inputs[3].value),
                turner: Number(inputs[4].value),
                description: inputs[5].value
            };
        });

        console.log("Updated Data:", updated);
    };



    return h('div', { className: 'section' },
        // h('spacer'),
        h('div', { className: 'card-header' },
            h('h2', null, 'Incubator'),
            h('div', { className: 'right-group' },
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'incubatorOption' }, 'Pilih Jenis Telur'),
                    h('select', { id: 'incubatorOption' },
                        h('option', { value: 'ayam' }, 'Ayam'),
                        h('option', { value: 'bebek' }, 'Bebek'),
                        h('option', { value: 'kalkun' }, 'Kalkun'),
                    )
                ),
            ),
        ),
        h('spacer'),
        h('div', { className: 'table-wrapper' },
            h('table', { className: isEdit ? 'table-input' : '' },

                h('thead', null,
                    h('tr', null,
                        incubatorHeader.map((title, i) => h('th', { key: i }, title))
                    )
                ),
                h('tbody', null,
                    incubatorData.map((row, rowIndex) =>
                        h('tr', { key: rowIndex, className: "incRow" },
                            Object.entries(row).map(([key, value], colIndex) =>
                                h('td', { key: `${rowIndex}-${colIndex}` },
                                    isEdit ?
                                        h('input', {
                                            type: getInputType(key),
                                            value,
                                            step: key === "temperature" ? 0.1 : (key === "humidity" ? 1 : undefined),
                                            min: key === "temperature" || key === "humidity" || key === 'turner' ? 0 : undefined,
                                        }) : value,
                                )
                            )
                        )
                    )
                )
            )
        ),
        h('div', { className: isEdit ? 'btn-incubator' : 'btn-edit' },
            isEdit && h('button', { onClick: handleAdd }, 'Tambah'),
            h('button', { onClick: isEdit ? handleCancel : handleEdit }, isEdit ? 'Batal' : 'Ubah'),
            isEdit && h('button', { onClick: handleSave }, 'Simpan'),
        ),
        h('spacer'),
        h('h4', null, 'Toleransi:'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'temperatureTolerance' }, 'Suhu'),
                h('input', { type: 'number', step: 0.1, min: 0, max: 15, id: 'temperatureTolerance' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'humidityTolerance' }, 'Kelembaban'),
                h('input', { type: 'number', step: 1, min: 0, max: 20, id: 'humidityTolerance' })
            ),
        ),
    );
}

function SetWiFi() {
    return h('div', { className: 'section' },
        h('h2', null, 'WiFi'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'wifiSSID' }, 'SSID'),
                h('input', { type: 'text', id: 'wifiSSID' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'wifiPass' }, 'Kata Sandi'),
                h('input', { type: 'text', id: 'wifiPass' })
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );
}

function SetTelegram() {
    return h('div', { className: 'section' },
        h('h2', null, 'Telegram'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgToken' }, 'ID Token'),
                h('input', { type: 'text', id: 'tgToken' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgChatID' }, 'ID Obrolan'),
                h('input', { type: 'text', id: 'tgChatID' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgInterval' }, 'Waktu Jeda'),
                h('input', { type: 'number', min: 1, id: 'tgInterval' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgEnable' }, 'Aktifkan'),
                h('select', { id: 'tgEnable' },
                    h('option', { value: 'true' }, 'Ya'),
                    h('option', { value: 'false' }, 'Tidak'),
                ),
                h('button', null, 'Uji'),
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );
}

function SetGAS() {
    return h('div', { className: 'section' },
        h('h2', null, 'Google Apps Script'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'gasDeploymentID' }, 'ID Penerapan'),
                h('input', { type: 'text', id: 'gasDeploymentID' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'gasSheetID' }, 'ID Lembar'),
                h('input', { type: 'text', id: 'gasSheetID' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'gasInterval' }, 'Waktu Jeda'),
                h('input', { type: 'number', min: 1, id: 'gasInterval' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'gasEnable' }, 'Aktifkan'),
                h('select', { id: 'gasEnable' },
                    h('option', { value: 'true' }, 'Ya'),
                    h('option', { value: 'false' }, 'Tidak'),
                ),
                h('button', null, 'Uji'),
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );
}

function SetChangePassword() {
    return h('div', { className: 'section change-password' },
        h('h2', null, 'Ubah Kata Sandi Admin'),
        h('div', { className: 'form-group' },
            h('label', { htmlFor: 'oldPassword' }, 'Kata Sandi Lama'),
            h('input', { type: 'password', id: 'oldPassword' })
        ),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'newPassword' }, 'Kata Sandi Baru'),
                h('input', { type: 'password', id: 'newPassword' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'passwordConfirm' }, 'Konfirmasi Kata Sandi'),
                h('input', { type: 'password', id: 'passwordConfirm' })
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );
}

function SetRelay() {
    return h('div', { className: 'section' },
        h('h2', null, 'Relay'),
        h('div', { className: 'section-grid' },
            h('div', { className: 'form-row relay' },
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'relayHeater' }, 'Pemanas'),
                    h('select', { id: 'relayHeater' },
                        h('option', { value: 'true' }, 'Aktif'),
                        h('option', { value: 'false' }, 'Nonaktif'),
                    ),
                    h('button', null, 'Uji'),
                ),
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'relayHumidifier' }, 'Pelembab'),
                    h('select', { id: 'relayHumidifier' },
                        h('option', { value: 'true' }, 'Aktif'),
                        h('option', { value: 'false' }, 'Nonaktif'),
                    ),
                    h('button', null, 'Uji'),
                ),
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'relayTurner' }, 'Pembalik'),
                    h('select', { id: 'relayTurner' },
                        h('option', { value: 'true' }, 'Aktif'),
                        h('option', { value: 'false' }, 'Nonaktif'),
                    ),
                    h('button', null, 'Uji'),
                ),
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'relayFan' }, 'Kipas'),
                    h('select', { id: 'relayFan' },
                        h('option', { value: 'true' }, 'Aktif'),
                        h('option', { value: 'false' }, 'Nonaktif'),
                    ),
                    h('button', null, 'Uji'),
                ),
            ),
        ),
    );
}

function Setting() {
    return h('div', { className: 'main-section' },
        h('h1', null, 'Pengaturan'),
        h('div', { className: 'section' },
            h(SetDatetime),
            h('spacer'),
            h(SetIncubator),
            h('spacer'),
            h(SetRelay),
            h('spacer'),
            h(SetWiFi),
            h('spacer'),
            h(SetTelegram),
            h('spacer'),
            h(SetGAS),
            h('spacer'),
            h(SetChangePassword),
        ),
    );

}

function AuthForm() {
    return h('div', { className: 'section' },
        h('div', { className: 'card auth' },
            h('h2', null, 'Login'),
            h('spacer'),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'username' }, 'Nama pengguna'),
                h('input', { type: 'text', id: 'username' }),
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'password' }, 'Kata Sandi'),
                h('input', { type: 'password', id: 'password' }),
            ),
            h('button', null, 'Masuk'),
        ),
    );
}
function AppView() {
    const [activeSection, setActiveSection] = useState('home');
    function hancleNav(section) {
        setActiveSection(section)
    }
    return h('div', { className: 'wrapper' },
        h(Nav, { onNav: hancleNav }),
        activeSection === 'home' && h(Home),
        activeSection === 'setting' && h(Setting),
        activeSection === 'auth' && h(AuthForm),
        h(Footer),
    );
}