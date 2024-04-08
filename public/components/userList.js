function renderClientsList() {
    $(".conteudo").append(`<div id="clients-list"></div>`);
    const clientsList = $('#clients-list');
    clientsList.empty();
    
    $.ajax({
        url: 'http://localhost:3001/clients',
        type: 'GET',
        success: function(clients) {
            clients.forEach((client, index) => {

            const itemList = `
            <div class="client">
              <div class="index">${index + 1}</div>
              <div class="info">
                <p class="name py-0 my-0">${client.Nome}</p>
                <div class="d-flex flex-row gap-3">
                  <p class="phone py-0 my-0"><i class="fa-solid fa-location-dot mx-1"></i>${client.Endereco}</p>
                  <p class="phone py-0 my-0"><i class="fa-light fa-rings-wedding mx-1"></i>${client.Casado == true ? "Casado" : "Solteiro"}</p>
                  <p class="phone py-0 my-0"><i class="fa-light fa-money-bill mx-1"></i>R$${client.Renda}</p>
                </div>
              </div>
              <div class="actions">
                <a tabindex="0" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left" data-uid="${client.id}"><i class="fa fa-ellipsis-v"></i></a>
              </div>
            </div>
            `;

            clientsList.append(itemList);
            //popover
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
              return new bootstrap.Popover(popoverTriggerEl, {
                html: true,
                content: `
                <div class="d-flex flex-column gap-2">
                  <a class="btn btn-outline-primary px-5 border-0 text-start" id="btn-detalhes">Detalhes</a>
                  <a class="btn btn-outline-primary px-5 border-0" id="btn-editar">Editar</a>
                  <hr class="my-1">
                  <a class="btn btn-outline-danger px-5 border-0" id="btn-excluir">Excluir</a>
                </div>`
              });
            });
          });
        }
    });
}

//clique do botao excluir
$(document).on('click', '#btn-excluir', function() {

    const popoverId = $(this).offsetParent().attr('id');
    var uid = $(`[aria-describedby="${popoverId}"]`).data('uid');

    $.ajax({
        url: `http://localhost:3001/clients/${uid}`,
        type: 'DELETE',
        success: function() {
            renderClientsList();
        }
    });
});

$(document).on('click', '#btn-add', function() {
    let isInvalid;
    
    let name = $("#client-name").val();
    if(name == "") {
      $("#client-name").addClass("error");
      $('[for="client-name"]').addClass("error");
      isInvalid = true;
    }
    else {$("#client-name").removeClass("error"); $('[for="client-name"]').removeClass("error");}
    

    let address = $("#client-address").val();
    if(address == "") {
      $("#client-address").addClass("error");
      $('[for="client-address"]').addClass("error");
      isInvalid = true;
    } else {$("#client-address").removeClass("error"); $('[for="client-address"]').removeClass("error")}

    let cpf = $("#client-cpf").val();
    if(cpf == "") {
      $("#client-cpf").addClass("error");
      $('[for="client-cpf"]').addClass("error");
      isInvalid = true;
    } else {$("#client-cpf").removeClass("error"); $('[for="client-cpf"]').removeClass("error")}

    let income = $("#client-income").val();
    if(income == "") {
      $("#client-income").addClass("error");
      $('[for="client-income"]').addClass("error");
      isInvalid = true;
    } else {$("#client-income").removeClass("error"); $('[for="client-income"]').removeClass("error")}

    let marry = $("#client-marry").val();
    if(marry == "") {
      $("#client-marry").addClass("error");
      $('[for="client-marry"]').addClass("error");
      isInvalid = true;
    } else {$("#client-marry").removeClass("error"); $('[for="client-marry"]').removeClass("error")}
    if(isInvalid) return;

    $.ajax({
        url: 'http://localhost:3001/clients',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            Nome: name,
            Endereco: address,
            CPF: cpf,
            Renda: income,
            Casado: marry === "true" ? true : false
        }),
        success: function() {
            renderClientsList();
            $("#client-name").val("");
            $("#client-address").val("");
            $("#client-cpf").val("");
            $("#client-income").val("");
            $("#client-marry").val("");
            const modal = bootstrap.Modal.getOrCreateInstance($("#addModal"));
            modal.hide();
        }
    });
});