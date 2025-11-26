import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styleVacinas";

import AsyncStorage from "@react-native-async-storage/async-storage";

const vacinas = [
  {
    categoria: "Crianças (0–9 anos)",
    lista: [
      {
        nome: "BCG",
        idade: "Ao nascer",
        descricao: "Previne formas graves de tuberculose.",
        obrigatoria: true,
      },
      {
        nome: "Hepatite B",
        idade: "Ao nascer, 2 e 6 meses",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Pentavalente (DTP + Hib + Hepatite B)",
        idade: "2, 4 e 6 meses",
        descricao:
          "Protege contra difteria, tétano, coqueluche, Hib e hepatite B.",
        obrigatoria: true,
      },
      {
        nome: "IPV/VOP (Poliomielite)",
        idade: "2, 4, 6 e 15 meses",
        descricao: "Previne poliomielite (paralisia infantil).",
        obrigatoria: true,
      },
      {
        nome: "Rotavírus",
        idade: "2 e 4 meses",
        descricao: "Protege contra gastroenterite grave por rotavírus.",
        obrigatoria: true,
      },
      {
        nome: "Pneumocócica 10-valente",
        idade: "2, 4 e 12 meses",
        descricao: "Previne pneumonia, meningite e otite.",
        obrigatoria: true,
      },
      {
        nome: "Meningocócica C",
        idade: "3 e 5 meses, reforço aos 12 meses",
        descricao: "Protege contra meningite meningocócica C.",
        obrigatoria: true,
      },
      {
        nome: "Tríplice viral (SCR)",
        idade: "12 e 15 meses",
        descricao: "Protege contra sarampo, caxumba e rubéola.",
        obrigatoria: true,
      },
      {
        nome: "Varicela",
        idade: "15 meses",
        descricao: "Previne catapora.",
        obrigatoria: true,
      },
    ],
  },

  {
    categoria: "Adolescentes (10–19 anos)",
    lista: [
      {
        nome: "dT (difteria e tétano)",
        idade: "Reforço a cada 10 anos",
        descricao: "Protege contra difteria e tétano.",
        obrigatoria: true,
      },
      {
        nome: "Tríplice viral",
        idade: "2 doses se não vacinado",
        descricao: "Protege contra sarampo, caxumba e rubéola.",
        obrigatoria: true,
      },
      {
        nome: "HPV quadrivalente",
        idade: "2 doses (meninos e meninas até 14 anos)",
        descricao: "Previne cânceres relacionados ao HPV.",
        obrigatoria: false,
      },
      {
        nome: "Hepatite B",
        idade: "Completar 3 doses se necessário",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Meningocócica ACWY",
        idade: "11–14 anos",
        descricao: "Protege contra meningite dos tipos A, C, W e Y.",
        obrigatoria: false,
      },
    ],
  },

  {
    categoria: "Adultos (20–59 anos)",
    lista: [
      {
        nome: "dT (difteria e tétano)",
        idade: "Reforço a cada 10 anos",
        descricao: "Protege contra difteria e tétano.",
        obrigatoria: true,
      },
      {
        nome: "Hepatite B",
        idade: "3 doses se não vacinado",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Tríplice viral",
        idade: "2 doses até 29 anos, 1 dose de 30 a 59",
        descricao: "Protege contra sarampo, caxumba e rubéola.",
        obrigatoria: true,
      },
      {
        nome: "Febre amarela",
        idade: "1 dose até 59 anos (em áreas recomendadas)",
        descricao: "Previne febre amarela.",
        obrigatoria: false,
      },
      {
        nome: "Covid-19",
        idade: "Conforme calendário anual",
        descricao: "Protege contra o vírus SARS-CoV-2.",
        obrigatoria: true,
      },
    ],
  },

  {
    categoria: "Gestantes",
    lista: [
      {
        nome: "dTpa",
        idade: "1 dose a partir da 20ª semana",
        descricao: "Protege mãe e bebê contra tétano, difteria e coqueluche.",
        obrigatoria: true,
      },
      {
        nome: "Influenza",
        idade: "Em qualquer idade gestacional",
        descricao: "Reduz riscos de gripe e complicações.",
        obrigatoria: true,
      },
      {
        nome: "Hepatite B",
        idade: "Completar esquema, se necessário",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Covid-19",
        idade: "Conforme recomendação vigente",
        descricao: "Protege contra SARS-CoV-2.",
        obrigatoria: true,
      },
    ],
  },

  {
    categoria: "Puérperas (até 45 dias após o parto)",
    lista: [
      {
        nome: "Influenza",
        idade: "1 dose se não vacinou na gestação",
        descricao: "Previne gripe e complicações.",
        obrigatoria: true,
      },
      {
        nome: "dTpa",
        idade: "1 dose se não recebeu durante a gestação",
        descricao: "Protege contra tétano, difteria e coqueluche.",
        obrigatoria: true,
      },
      {
        nome: "Hepatite B",
        idade: "Completar esquema, se necessário",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Covid-19",
        idade: "Conforme calendário vigente",
        descricao: "Protege contra SARS-CoV-2.",
        obrigatoria: true,
      },
    ],
  },

  {
    categoria: "Idosos (60 anos ou mais)",
    lista: [
      {
        nome: "Influenza",
        idade: "Dose anual",
        descricao: "Previne gripe e complicações.",
        obrigatoria: true,
      },
      {
        nome: "dT ou dTpa",
        idade: "Reforço a cada 10 anos",
        descricao: "Protege contra difteria e tétano.",
        obrigatoria: true,
      },
      {
        nome: "Hepatite B",
        idade: "3 doses se esquema incompleto",
        descricao: "Protege contra hepatite viral B.",
        obrigatoria: true,
      },
      {
        nome: "Covid-19",
        idade: "Conforme calendário atualizado",
        descricao: "Protege contra SARS-CoV-2.",
        obrigatoria: true,
      },
      {
        nome: "Pneumocócica 23-valente",
        idade: "Idosos e grupos de risco",
        descricao: "Previne pneumonia e meningite pneumocócica.",
        obrigatoria: false,
      },
    ],
  },
];

export default function App() {
  const navigation = useNavigation();
  const [Vacinas, setVacinas] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriasAbertas, setCategoriasAbertas] = useState({});

  const toggleCategoria = (categoria) => {
    setCategoriasAbertas((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerVacinas}>
        <View style={styles.nav}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              style={styles.imgPerfil}
              source={require("../../../assets/seta-esquerda.png")}
            />
            
          </Pressable>
          
        </View>
        
        <ScrollView 
          style={styles.corpoVacinas}
          showsVerticalScrollIndicator={false}
        >
          {vacinas.map((grupo, index) => (
            <View key={index} style={styles.categoriaContainer}>
              {/* CARD DA CATEGORIA */}
              <Pressable
                style={styles.categoriaHeader}
                onPress={() => toggleCategoria(grupo.categoria)}
              >
                <View style={styles.categoriaIcon}>
                  <Text style={styles.categoriaIconText}>
                    {grupo.categoria.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.categoriaTitulo}>{grupo.categoria}</Text>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>
                    {categoriasAbertas[grupo.categoria] ? "▲" : "▼"}
                  </Text>
                </View>
              </Pressable>

              {/* CONTEÚDO EXPANDIDO */}
              {categoriasAbertas[grupo.categoria] && (
                <View style={styles.vacinasLista}>
                  {grupo.lista.map((vacina, vacinaIndex) => (
                    <View key={vacinaIndex} style={styles.vacinaCard}>
                      <View style={styles.vacinaHeader}>
                        <View style={styles.vacinaTitleContainer}>
                          <Text style={styles.vacinaNome}>{vacina.nome}</Text>
                          <View
                            style={[
                              styles.obrigatoriaBadge,
                              vacina.obrigatoria
                                ? styles.obrigatoria
                                : styles.opcional,
                            ]}
                          >
                            <Text style={styles.obrigatoriaTexto}>
                              {vacina.obrigatoria ? "Obrigatória" : "Opcional"}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.vacinaInfo}>
                        <View style={styles.infoItem}>
                          <Image
                            style={styles.icon}
                            source={require("../../../assets/relogio.png")}
                          />
                          <Text style={styles.vacinaIdade}>{vacina.idade}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.divider} />
                      
                      <Text style={styles.vacinaDescricao}>
                        {vacina.descricao}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Mantenha sua vacinação em dia 💚
            </Text>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}