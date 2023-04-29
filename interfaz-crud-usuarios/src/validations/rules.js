

function validateEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Comprueba si el email coincide con el formato de correo electrónico válido
    if (emailRegex.test(email)) {
        // El email es válido, retorna true
        return true;
    } else {
        // El email es inválido, retorna un string con el mensaje de error
        return 'La dirección de correo electrónico no es válida';
    }
}

function validateProjectName(name) {
    // Comprueba si el nombre no está vacío
    if (!name) {
        // El nombre está vacío, retorna un string con el mensaje de error
        return 'El nombre del proyecto no puede estar vacío';
    }

    if (name.length < 5) {
        return "El nombre proyecto debe tener al menos 5 caracteres"
    }

    if (name.length > 25) {
        return "El nombre proyecto no debe tener más de 5 caracteres"
    }

    // El nombre cumple con todas las condiciones, retorna true
    return true;
}

function validateTeamName(name) {
    // Comprueba si el nombre no está vacío
    if (!name) {
        // El nombre está vacío, retorna un string con el mensaje de error
        return 'El nombre del team no puede estar vacío';
    }

    // Comprueba si el nombre contiene solo letras y espacios
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        // El nombre contiene caracteres no permitidos, retorna un string con el mensaje de error
        return 'El nombre del team solo puede contener letras y espacios';
    }

    if (name.length < 5) {
        return "El nombre del team debe tener al menos 5 caracteres"
    }

    if (name.length > 25) {
        return "El nombre del team no debe tener más de 25 caracteres"
    }


    // El nombre cumple con todas las condiciones, retorna true
    return true;
}

function validateName(name) {
    // Comprueba si el nombre no está vacío
    if (!name) {
        // El nombre está vacío, retorna un string con el mensaje de error
        return 'El nombre no puede estar vacío';
    }

    // Comprueba si el nombre contiene solo letras y espacios
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        // El nombre contiene caracteres no permitidos, retorna un string con el mensaje de error
        return 'El nombre solo puede contener letras y espacios';
    }

    if (name.length < 2) {
        return "El nombre debe tener al menos 2 caracteres"
    }

    if (name.length > 25) {
        return "El nombre no debe tener más de 25 caracteres"
    }

    // El nombre cumple con todas las condiciones, retorna true
    return true;
}

function validateDescription(description) {
    // Comprueba si el nombre no está vacío
    if (!description) {
        // El nombre está vacío, retorna un string con el mensaje de error
        return 'La descripción no puede estar vacío';
    }


    if (description.length < 10) {
        return "La descripción debe tener al menos 10 caracteres"
    }

    if (description.length > 100) {
        return "La descripción no debe tener más de 100 caracteres"
    }

    // El nombre cumple con todas las condiciones, retorna true
    return true;
}


function validateSurname(surname) {
    // Comprueba si el apellido no está vacío
    if (!surname) {
        // El apellido está vacío, retorna un string con el mensaje de error
        return 'El apellido no puede estar vacío';
    }

    // Comprueba si el apellido contiene solo letras y espacios
    const surnameRegex = /^[A-Za-z\s]+$/;
    if (!surnameRegex.test(surname)) {
        // El apellido contiene caracteres no permitidos, retorna un string con el mensaje de error
        return 'El apellido solo puede contener letras y espacios';
    }

    if (surname.length < 2) {
        return "El apellido debe tener al menos 2 caracteres"
    }
    // El apellido cumple con todas las condiciones, retorna true
    return true;
}

function validateCity(city) {
    // Comprueba si la ciudad no está vacía
    if (!city) {
        // La ciudad está vacía, retorna un string con el mensaje de error
        return 'La ciudad no puede estar vacía';
    }

    // Comprueba si la ciudad contiene solo letras y espacios
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(city)) {
        // La ciudad contiene caracteres no permitidos, retorna un string con el mensaje de error
        return 'La ciudad solo puede contener letras y espacios';
    }

    // La ciudad cumple con todas las condiciones, retorna true
    return true;
}


function validatePassword(password) {
    // Comprueba si la contraseña no está vacía
    if (!password) {
        // La contraseña está vacía, retorna un string con el mensaje de error
        return 'La contraseña no puede estar vacía';
    }

    // Comprueba si la contraseña tiene al menos 6 caracteres y máximo 30
    if (password.length < 6 || password.length > 30) {
        // La contraseña no cumple con el rango de caracteres, retorna un string con el mensaje de error
        return 'La contraseña debe tener mínimo 6 caracteres y máximo 30 caracteres';
    }

    // Comprueba si la contraseña contiene al menos 1 número
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        // La contraseña no contiene al menos 1 número, retorna un string con el mensaje de error
        return 'La contraseña debe contener al menos 1 número';
    }

    // La contraseña cumple con todas las condiciones, retorna true
    return true;
}

function validateBirthdate(fechaDeNacimiento) {
    console.log("fechaDeNacimiento: ", fechaDeNacimiento);
    // Comprueba si la fecha de nacimiento no está vacía
    if (!fechaDeNacimiento) {
        // La fecha de nacimiento está vacía, retorna un string con el mensaje de error
        return 'La fecha de nacimiento no puede estar vacía';
    }

    // Convierte la fecha de nacimiento en un objeto de tipo Date
    const birthdate = new Date(fechaDeNacimiento);

    // Comprueba si la fecha de nacimiento es válida
    // if (!isNaN(birthdate.getTime())) {
    //   // La fecha de nacimiento no es válida, retorna un string con el mensaje de error
    //   return 'La fecha de nacimiento no es válida';
    // }

    // Calcula la diferencia en milisegundos entre la fecha de nacimiento y la fecha actual
    const currentDate = new Date();
    const ageDifference = currentDate - birthdate;

    // Calcula la edad en años
    const ageInYears = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365));

    // Comprueba si la edad es menor a 12 años
    if (ageInYears < 12) {
        // La edad es menor a 12 años, retorna un string con el mensaje de error
        return 'Debes tener al menos 12 años para registrarte';
    }

    // La fecha de nacimiento cumple con todas las condiciones, retorna true
    return true;
}

function validateEndDate(endDate) {
    console.log("EndDate: ", endDate);
    // Comprueba si la fecha de nacimiento no está vacía
    if (!endDate) {
        // La fecha de nacimiento está vacía, retorna un string con el mensaje de error
        return 'La fecha de fin estimada no puede estar vacía';
    }

    const fechaActual = new Date();
    var parts = endDate.split("/");
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    endDate =  new Date(parts[2], parts[1] - 1, parts[0]); // month is 0-based

    console.log("Tipo date: ", typeof endDate);

    // Comprobar si la fecha está en el pasado
    const esFechaPasada = endDate.getTime() < fechaActual.getTime();
    console.log("esFechaPasada: ", esFechaPasada, " | endDate: ", endDate, " | fechaActual: ", fechaActual);
    if (esFechaPasada) {
        console.log("Es pasado");
        return "La fecha estimada de fin no puede estar en el pasado, seleccione por lo menos una semana de plazo";
    }

    // Comprobar si ha pasado una semana desde la fecha actual
    const unaSemanaEnMs = 7 * 24 * 60 * 60 * 1000; // Una semana en milisegundos
    const fechaEnUnaSemana = new Date(fechaActual.getTime() + unaSemanaEnMs);
    const cumpleMinimoSemana = endDate.getTime() > fechaEnUnaSemana.getTime();

    if (!cumpleMinimoSemana) {
        return "Por favor, designe un plazo estimado de por lo menos una semana para la realización del trabajo"
    }

    // La fecha de nacimiento cumple con todas las condiciones, retorna true
    return true;
}





export { validateEmail, validateName, validateSurname, validateCity, validatePassword, validateBirthdate, validateProjectName, validateTeamName, validateDescription, validateEndDate }