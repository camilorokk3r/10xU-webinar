# Webinar 10xU

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app). Se basa en el siguiente prototipo: 

## Requerimientos

Para correr este proyecto de manera local necesitas:

* Node 10+
* Yarn
  
## Para iniciar

Para instalar las dependencias, en la raiz del directorio corre el siguiente comando:

```bash
yarn
```

Para iniciar el servidor local, en la raiz del directorio corre el siguiente comando:

```bash
yarn start
```

Para ver el proyecto funcionando, abre el navegador en la siguiente dirección [http://localhost:3000](http://localhost:3000) .

La página se refresca automaticamente si hace edición en el codigo.

## Ramas del repositorio

El repositorio consta de las siguientes ramas, que muestran el proceso de creación por etapas de la aplicación completa:

* step-1: Muestra la creacion de las páginas básicas de Login, Signup y Welcome con todos los elementos gráficos y un router para poder acceder a cada una de ellas por medio de una url específica (/login, /signup y / respectivamente)

* step-2: Muestra la creacion de la páginas de ToDo con los elementos gráficos básicos (Lista con datos dummy y navegación inferior). Se incluye acceso bajo la ruta /todo

* step-3: Muestra la adición de un componente "Popover" para la adición de ToDos.

* step-4: Muestra la adición dinámica de ToDos pero todavia sin persistencia (al refrescar la página los ToDos se desaparecen).

* step-5: Muestra la adición del SDK (Software Developmen Kit) de [Firebase](https://firebase.google.com/). Muestra como integrar la autenticación de email y password de firebase en la página de login y el registro con email y password en la página de signup. Este branch además adiciona un componente contenedor para verificar si el usuario esta logueado y redireccionarlo automáticamente a la página de ToDos (/todo)

* step-6: Muestra la adición de [Firebase Firestore](https://firebase.google.com/products/firestore) una de las bases de datos de Firebase para persistir los ToDos. Esta vez al refrescar la pantalla, los ToDos vuelven a aparecer. Todavía marcar un ToDo como completado no se está persistiendo.\

* step-7: Muestra la persistencia de los estados de los ToDos en Firestore. Además incluye la funcionalidad de subir imágenes a [Firebase Storage](https://firebase.google.com/products/storage). En adición muestra un componente de Avatar en la lista de ToDos con una vista previa de la foto cargada, y al darle click, muestra un componente de "slide" que deja ver la foto cargada en pantalla completa

## Más Información

Puedes aprender mas sobre el generador de aplicaciónes en el siguiente enlace [Documentación Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender sobre react usa el siguiente enlace [Documentación React](https://reactjs.org/).