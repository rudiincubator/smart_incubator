const { h } = preact;
const { useState, useEffect, useRef } = preactHooks;
const infoTable = new AppTable({ header: formatTable.info, data: dataSample.info, key: 'info-table' });
const eggTable = new AppTable({ header: formatTable.egg, data: dataSample.egg, key: 'egg-table' });
const incubationTable = new AppTable({ header: formatTable.incubator, data: dataSample.incubator, key: 'incubation-table' });

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
                h('a', { href: '#', onClick: () => hancleNav('incubator') }, 'Incubator'),
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
                h('a', { href: 'https://www.facebook.com/rudiromeodelta', target: '_blank', rel: 'noopener noreferrer' }, 'Romeo Delta'),
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

function Home() {

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
                h(TableUI, { controller: infoTable }),
            ),
            h('spacer'),
            h('div', { className: 'section' },
                h('div', { className: 'card-header-row' },
                    h('h2', null, 'Data Telur'),
                    h('div', { className: 'right-group' },
                        h('p', null, 'Jumlah:'),
                        h('p', null, eggTable.getSum('quantity')),
                    ),
                ),
                h(TableUI, { controller: eggTable })
            ),

        ),
    );

}

function SetDatetime() {

    const handleSyncDateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toISOString().split('T')[0];
        document.getElementById('setTime').value = timeString;
        document.getElementById('setDate').value = dateString;
    };

    return h('div', { className: 'card' },
        h('h2', null, 'Waktu dan Tanggal'),
        h('div', { className: 'form-row' },
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'setTime' }, 'Waktu'),
                h('input', { type: 'time', id: 'setTime' }),
                // ),
                // h('div', { className: 'form-group' },
                h('label', { htmlFor: 'setDate' }, 'Tanggal'),
                h('input', { type: 'date', id: 'setDate' }),
                h('button', { onClick: handleSyncDateTime }, 'Sync'),
            ),
        ),
        h('button', { className: 'btn-save' }, 'Simpan'),
    );

}

function SetIncubator() {


    return h('div', { className: 'section' },
        // h('spacer'),
        h('div', { className: 'card-header' },
            h('h2', null, 'Incubator'),
            h('div', { className: 'right-group' },
                h('div', { className: 'form-group' },
                    h('label', { htmlFor: 'incubatorOption' }, 'Mode Otomatis'),
                    h('select', { id: 'incubatorOption' },
                        h('option', { value: 'ayam' }, 'Ayam'),
                        h('option', { value: 'bebek' }, 'Bebek'),
                        h('option', { value: 'kalkun' }, 'Kalkun'),
                    )
                ),
            ),
        ),
        h('spacer'),
        h(TableUI, { controller: incubationTable, editTable: true }),
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




function EggTable() {

    return h('div', { className: 'section' },
        h('div', { className: 'card-header' },
            h('h2', null, 'Data Telur'),
            h('div', { className: 'right-group' },
                h('p', null, 'Jumlah:'),
                h('p', null, '250'),
            ),
        ),
        h(TableUI, { controller: eggTable, editTable: true })
        // h(TableCanEdit, { header: sample.thTelur, data: sample.tdTelur, isOnInput: true })
    );
}

function IncubatorSetting() {
    return h('div', { className: 'main-section' },
        h('h1', null, 'Pengaturan Incubator'),
        h('div', { className: 'section' },
            h(SetDatetime),
            h('spacer'),
            h(SetIncubator),
            h('spacer'),
            h(EggTable),
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
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgLowTemperatureAlarm' }, 'Peringatan Suhu Rendah'),
                h('input', { type: 'number', min: 1, id: 'tgLowTemperatureAlarm' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgHighTemperatureAlarm' }, 'Peringatan Suhu Tinggi'),
                h('input', { type: 'number', min: 1, id: 'tgHighTemperatureAlarm' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgLowHumidityAlarm' }, 'Peringatan Kelembaban Rendah'),
                h('input', { type: 'number', min: 1, id: 'tgHighHumidityAlarm' })
            ),
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'tgHighTemperatureAlarm' }, 'Peringatan Kelembaban Rendah'),
                h('input', { type: 'number', min: 1, id: 'tgHighTemperatureAlarm' })
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
        activeSection === 'incubator' && h(IncubatorSetting),
        activeSection === 'setting' && h(Setting),
        activeSection === 'auth' && h(AuthForm),
        h(Footer),
    );
}