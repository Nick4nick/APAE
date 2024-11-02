<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <title>Calendário de Agendamentos - Apae</title>
    <link href="../css/calendarStyle.css" rel="stylesheet" type="text/css"/>
    <style>
        /* Estilos simples para o calendário */
        #calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-top: 20px;
        }
        .day, .days-row div {
            padding: 10px;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        .day:hover {
            background-color: #f0f0f0;
        }
        .event {
            background-color: #e0ffe0;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Calendário de Agendamentos</h1>
    </header>
    <main>
        <div id="calendar"></div>
        <button id="addEventButton">Adicionar Evento</button>
    </main>
    <script>
        const calendarEl = document.getElementById('calendar');
        let events = []; // Array para armazenar eventos

        function createCalendar() {
            const now = new Date();
            const month = now.getMonth();
            const year = now.getFullYear();

            calendarEl.innerHTML = ''; // Limpa o calendário existente

            const header = document.createElement('h2');
            header.innerText = now.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            calendarEl.appendChild(header);

            const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
            const daysRow = document.createElement('div');
            daysRow.className = 'days-row';
            daysOfWeek.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.innerText = day;
                daysRow.appendChild(dayElement);
            });
            calendarEl.appendChild(daysRow);

            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = new Date(year, month, 1).getDay();

            for (let i = 0; i < firstDay; i++) {
                const blank = document.createElement('div');
                daysRow.appendChild(blank);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.innerText = day;
                dayElement.className = 'day';
                dayElement.addEventListener('click', () => {
                    const dayEvents = events.filter(event => event.date === `${day}/${month + 1}`);
                    const eventMessage = dayEvents.length > 0
                        ? 'Eventos: ' + dayEvents.map(e => e.title).join(', ')
                        : 'Nenhum evento para essa data.';
                    alert(`Data clicada: ${day}/${month + 1}/${year}\n${eventMessage}`);
                });
                
                // Verifica se há eventos para o dia
                events.forEach(event => {
                    if (event.date === `${day}/${month + 1}`) {
                        dayElement.classList.add('event');
                    }
                });

                calendarEl.appendChild(dayElement);
            }
        }

        document.getElementById('addEventButton').addEventListener('click', () => {
            const title = prompt('Título do Evento:');
            const date = prompt('Data do Evento (DD/MM):');
            if (title && date) {
                const regex = /^\d{1,2}\/\d{1,2}$/; // Verifica se a data está no formato correto
                if (regex.test(date)) {
                    events.push({ title, date });
                    console.log(`Evento adicionado: ${title} na data ${date}`);
                    createCalendar(); // Atualiza o calendário para mostrar o novo evento
                } else {
                    alert('Formato de data inválido. Use DD/MM.');
                }
            } else {
                alert('Título e data são obrigatórios!');
            }
        });

        createCalendar();
    </script>
</body>
</html>
