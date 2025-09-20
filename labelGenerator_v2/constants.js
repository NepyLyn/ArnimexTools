const LABELSIZES = [
    {id: 1, type: "templateCircular", sizeName: "Chica 4cm", height: 4, width: 4, titleFontSize: 0.7, subtitleFontSize: 0.45, sloganSize: 0.6, qtySize: 0.75}
    ,{id: 2, type: "templateCircular", sizeName: "Mediana 4.5cm", height: 4.5, width: 4.5, titleFontSize: 0.8, subtitleFontSize: 0.55, sloganSize: 0.55, qtySize: 0.8}
    ,{id: 3, type: "templateCircular", sizeName: "Grande 6cm", height: 6, width: 6, titleFontSize: 1.1, subtitleFontSize: 0.7, sloganSize: 0.7, qtySize: 0.9}
    ,{id: 4, type: "templateRectangularHorizontal", sizeName: "Chica 5x3.5cm", height: 3.5, width: 5, titleFontSize: 0.8, subtitleFontSize: 0.4, sloganSize: 0.7}
    ,{id: 5, type: "templateRectangularHorizontal", sizeName: "Mediana 6x4cm", height: 4, width: 6, titleFontSize: 1, subtitleFontSize: 0.5, sloganSize: 0.8}
    ,{id: 6, type: "templateRectangularHorizontal", sizeName: "Grande 10x6cm", height: 6, width: 10, titleFontSize: 1.5, subtitleFontSize: 0.8, sloganSize: 1.3}
    ,{id: 7, type: "templateRectangularVertical", sizeName: "Chica 3x4cm", height: 4, width: 3, titleFontSize: 0.8, subtitleFontSize: 0.4, sloganSize: 0.1}
    ,{id: 8, type: "templateRectangularVertical", sizeName: "Grande 5x7cm", height: 7, width: 5, titleFontSize: 1.2, subtitleFontSize: 0.6, sloganSize: 0.7}
]

const BARCODENAMES = [
  "Acondicionador_Solido",
  "Bolsa_De_Arnica_Seca",
  "Bolsa_De_Espinosilla_Seca",
  "Bolsa_De_Marrubio_Seca",
  "Cepillo_De_Bambu",
  "Crema_Arnica_Calendula",
  "Crema_Chica_8_Manzanilla_Miel",
  "Crema_Grande_10_Manzanilla_Miel",
  "Crema_Tepezcohuite_Cuachalalte",
  "Desodorante_Alumbre",
  "Desodorante_Leche_Magnesia",
  "Desodorante_Solido_Coco_Karite_Bicarbonato",
  "Gel_Antibacterial_Manos_Arnica_Sin_Dispensador_250ml",
  "Gel_Antibacterial_Manos_Arnica_Sin_Dispensador_500ml",
  "Gel_Antibacterial_Manos_Arnica_Con_Dispensador_1L",
  "Gel_Antibacterial_Manos_Arnica_Con_Dispensador_300ml",
  "Gel_Antibacterial_Manos_Arnica_250ml_Con_Dispensador",
  "Gel_Arnica",
  "Jabon_Solido_De_Marrubio_Azomiate",
  "Jabon_Solido_Arroz_Miel",
  "Jabon_Solido_Arnica_Miel",
  "Jabon_Solido_Avena_Miel",
  "Jabon_Solido_Cafe_Miel",
  "Jabon_Liquido_Antibacterial_250ml_Con_Arnica",
  "Jabon_Liquido_Antibacterial_Con_Dispensador_500ml",
  "Jabon_Solido_Manzanilla_Miel",
  "Jabon_Solido_De_Romero_Miel",
  "Jabon_Solido_De_Rosa_De_Castilla",
  "Jabon_Solido_Espinosilla_Arnica_Higiene_Intima",
  "Jabon_Solido_De_Tepezcohuite_Cuacahalalate",
  "Jabon_De_Tepezcohuite_Miel",
  "Jabon_Liquido_Antibacterial_Con_Arnica_500ml_Sin_Dispensador",
  "Pomada_Arnica",
  "Shampoo_Liquido_Romero_Cola_De_Caballo_500ml",
  "Shampoo_Liquido_Cascara_De_Nuez_250ml",
  "Shampoo_Liquido_Cascara_De_Nuez_500ml",
  "Shampoo_Liquido_Manzanilla_Miel_250ml",
  "Shampoo_Liquido_Manzanilla_Miel_500ml",
  "Shampoo_Liquido_Antipiojos_Ruda_250ml",
  "Shampoo_Liquido_Romero_Cola_De_Caballo_250ml",
  "Shampoo_Liquido_Anticaida_Romero_Espinosilla_250ml",
  "Shampoo_Liquido_Anticaida_Romero_Espinosilla_500ml",
  "Shampoo_Solido_Carbon_Activado_Citricos",
  "Shampoo_Solido_Flor_De_Hibisco_Citricos",
  "Shampoo_Solido_Romero",
  "Exfoliante_Bicarbonato_Coco",
  "Balsamo_Labial"
]