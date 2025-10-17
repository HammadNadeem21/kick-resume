// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Link,
// } from "@react-pdf/renderer";
// import type { PageProps } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 28,
//     fontSize: 12,
//     fontFamily: "Helvetica",
//     flexDirection: "column",
//     backgroundColor: "#f6f8fa",
//   },
//   section: {
//     marginBottom: 12,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#222",
//     marginVertical: 14,
//   },
//   heading: {
//     fontSize: 13,
//     marginBottom: 6,
//     fontWeight: "bold",
//     textAlign: "left",
//     color: "#111",
//     // letterSpacing: 1.2,
//     textTransform: "uppercase",
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#111",
//     textAlign: "left",
//     marginBottom: 0,
//   },
//   role: {
//     fontSize: 15,

//     color: "#111",
//     textAlign: "left",
//     marginTop: 2,
//     marginBottom: 8,
//   },
//   contactRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 24,
//     marginBottom: 8,
//   },
//   contactItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 2,
//   },
//   label: {
//     fontWeight: "bold",
//     fontSize: 11,
//     color: "#111",
//     marginRight: 2,
//   },
//   text: {
//     fontSize: 11,
//     color: "#222",
//     lineHeight: 1.3,
//   },
//   summaryText: {
//     fontSize: 11,
//     color: "#222",
//     lineHeight: 1.5,
//   },
//   expBlock: {
//     marginBottom: 10,
//   },
//   expHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   expTitleCompany: {
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 8,
//   },
//   expTitle: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#111",
//     marginRight: 6,
//   },
//   expCompany: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#111",
//   },
//   expDates: {
//     fontSize: 8,
//     color: "#000",
//     marginLeft: 2,
//   },
//   expDescList: {
//     marginTop: 2,
//     marginLeft: 12,
//   },
//   expDescItem: {
//     fontSize: 11,
//     color: "#222",
//     marginBottom: 2,
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   bullet: {
//     color: "#222",
//     marginRight: 6,
//     fontSize: 13,
//     marginTop: -1,
//   },
//   eduRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   eduDegree: {
//     fontSize: 11,
//     color: "#222",
//   },
//   eduDates: {
//     fontSize: 8,
//     color: "#000",
//     marginLeft: 8,
//   },
//   skillsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 2,
//     marginBottom: 2,
//   },
//   skillText: {
//     fontSize: 11,
//     color: "#222",
//     marginRight: 6,
//   },
//   certLangRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 2,
//     marginBottom: 2,
//   },
//   certLangCol: {
//     width: "33%",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 2,
//   },
//   certificationCol: {
//     width: "50%",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 2,
//   },
//   certLangBullet: {
//     color: "#222",
//     marginRight: 6,
//     fontSize: 13,
//     marginTop: -1,
//   },
//   certLangText: {
//     fontSize: 11,
//     color: "#222",
//   },
//   projectBlock: {
//     marginBottom: 10,
//   },
//   projectHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   projectName: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#111",
//     marginBottom: 2,
//   },
//   projectDesc: {
//     fontSize: 11,
//     color: "#222",
//     marginBottom: 2,
//   },
//   projectLinks: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 24,
//     marginTop: 2,
//   },
//   projectLink: {
//     fontSize: 9,
//     color: "#000",
//     textDecoration: "underline",
//     marginRight: 18,
//   },
// });

// export default function Template8PDF({ data, size }: { data: any, size: PageProps["size"] }) {
//   return (
//     <Document>
//       <Page size={size} style={styles.page}>
//         {/* Header */}
//         <View style={{ marginBottom: 8 }}>
//           <Text style={styles.name}>{data.name}</Text>
//           <Text style={styles.role}>{data.role}</Text>
//         </View>
//         {/* Contact Info */}
//         <View style={styles.contactRow}>
//           <View style={styles.contactItem}>
//             <Text style={styles.label}>Phone:</Text>
//             <Text style={styles.text}>{`+${data.phone}`}</Text>
//           </View>
//           <View style={styles.contactItem}>
//             <Text style={styles.label}>Email:</Text>
//             <Text style={styles.text}>{data.email}</Text>
//           </View>
//           <View style={styles.contactItem}>
//             <Text style={styles.label}>Location:</Text>
//             <Text style={styles.text}>{data.address}</Text>
//           </View>
//         </View>

//         {/* Summary */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>SUMMARY</Text>
//           <Text style={styles.summaryText}>{data.summary}</Text>
//         </View>

//         {/* Experience */}
//         {data.experience.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>EXPERIENCE</Text>
//             <View style={{ marginTop: 4 }}>
//               {data.experience.map((item: any, i: number) => (
//                 <View key={i} style={styles.expBlock}>
//                   <View style={styles.expHeader}>
//                     <View style={styles.expTitleCompany}>
//                       <Text style={styles.expTitle}>{item.title}</Text>
//                       <Text style={styles.expCompany}>{item.companyName}</Text>
//                     </View>
//                     <Text
//                       style={styles.expDates}
//                     >{`(${item.startDate}  ${item.endDate})`}</Text>
//                   </View>
//                   {item.description && (
//                     <View style={styles.expDescList}>
//                       <View style={styles.expDescItem}>
//                         <Text style={styles.bullet}>•</Text>
//                         <Text>{item.description}</Text>
//                       </View>
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* Education */}
//         {data.education.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>EDUCATION</Text>
//             <View style={{ marginTop: 4 }}>
//               {data.education.map((item: any, i: number) => (
//                 <View key={i} style={styles.eduRow}>
//                   <Text style={styles.bullet}>•</Text>
//                   <Text style={styles.eduDegree}>{item.degree}</Text>
//                   {item.startDate && item.endDate && (
//                     <Text
//                       style={styles.eduDates}
//                     >{`(${item.startDate} - ${item.endDate})`}</Text>
//                   )}
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* Skills */}
//         {data.skills.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>SKILLS</Text>
//             <View style={styles.skillsRow}>
//               <Text style={styles.skillText}>{data.skills.join(", ")}</Text>
//             </View>
//           </View>
//         )}

//         {/* Certifications */}
//         {data.certifications.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>CERTIFICATIONS</Text>
//             <View style={styles.certLangRow}>
//               {data.certifications.map((item: any, i: number) => (
//                 <View key={i} style={styles.certificationCol}>
//                   <Text style={styles.certLangBullet}>•</Text>
//                   <Text style={styles.certLangText}>{item}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* Languages */}
//         {data.languages.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>LANGUAGES</Text>
//             <View style={styles.certLangRow}>
//               {data.languages.map((item: any, i: number) => (
//                 <View key={i} style={styles.certLangCol}>
//                   <Text style={styles.certLangBullet}>•</Text>
//                   <Text style={styles.certLangText}>{item}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* Projects */}
//         {data.projects.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.heading}>PROJECTS</Text>
//             <View style={{ marginTop: 4 }}>
//               {data.projects.map((item: any, i: number) => (
//                 <View key={i} style={styles.projectBlock}>
//                   <View style={styles.projectHeader}>
//                     <Text style={styles.bullet}>•</Text>
//                     <Text style={styles.projectName}>{item.name}</Text>
//                   </View>
//                   <Text style={styles.projectDesc}>{item.description}</Text>
//                   {(item.github || item.live) && (
//                     <View style={styles.projectLinks}>
//                       {item.github && (
//                         <Link src={item.github} style={styles.projectLink}>
//                           GitHub
//                         </Link>
//                       )}
//                       {item.live && (
//                         <Link src={item.live} style={styles.projectLink}>
//                           live demo
//                         </Link>
//                       )}
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}
//       </Page>
//     </Document>
//   );
// }

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 22,
    paddingHorizontal: 18,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 6,
    marginTop: 6,
  },
  heading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "left",
    color: "#000",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginBottom: 8,
  },
  personalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
    marginTop: 6,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    fontSize: 10,
    color: "#000",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
    color: "#000",
  },
  text: {
    fontSize: 11,
    color: "#000",
    lineHeight: 1.3,
  },
  summaryText: {
    fontSize: 10,
    color: "#000",
    lineHeight: 1.5,
    marginTop: 8,
  },
  expBlock: {
    marginBottom: 6,
    marginTop: 6,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expTitleCompany: {
    flexDirection: "column",
    gap: 4,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
  },
  expCompany: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000",
  },
  expDates: {
    fontSize: 8,
    color: "#000",
  },
  expDescItem: {
    fontSize: 10,
    color: "#000",
    marginTop: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  bullet: {
    color: "#000",
    marginRight: 6,
    fontSize: 11,
  },
  eduGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 12,
  },
  eduCol: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  eduDegree: {
    fontSize: 10,
    color: "#000",
  },
  eduDates: {
    fontSize: 8,
    color: "#000",
  },
  skillsContainer: {
    marginTop: 12,
    paddingLeft: 20,
  },
  skillText: {
    fontSize: 10,
    color: "#000",
  },
  certificationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 4,
  },
  certificationCol: {
    width: "48%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  languagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 4,
  },
  languageCol: {
    width: "32%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  projectBlock: {
    marginBottom: 6,
    marginTop: 6,
    paddingLeft: 12,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  projectName: {
    fontWeight: "600",
    fontSize: 13,
    color: "#000",
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 10,
    color: "#000",
    marginBottom: 4,
    paddingLeft: 16,
    lineHeight: 1.5,
  },
  projectLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 100,
    marginTop: 4,
    paddingLeft: 16,
  },
  projectLink: {
    fontSize: 11,
    color: "#000",
    textDecoration: "underline",
  },
  customSectionList: {
    paddingLeft: 20,
    marginTop: 6,
  },
  customSectionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
});

export default function Template8PDF({
  data,
  size,
}: {
  data: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Header - Name and Role */}
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
        </View>

        {/* Personal Information */}
        {data.personalInformation && data.personalInformation.length > 0 ? (
          <View style={styles.personalInfoContainer}>
            {data.personalInformation.map((item: any, idx: number) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  gap: 4,
                  fontSize: 10,
                  color: "#000",
                }}
              >
                <Text style={styles.boldText}>{item.title}:</Text>
                <Text style={{ fontSize: 9, marginTop: 1 }}>{item.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>SUMMARY</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        {/* Experience */}

        <View style={styles.section}>
          <Text style={styles.heading}>EXPERIENCE</Text>
          <View style={{ paddingLeft: 20, marginTop: 0 }}>
            {data.experience.map((item: any, i: number) => (
              <View key={i} style={styles.expBlock}>
                <View style={styles.expHeader}>
                  <View style={styles.expTitleCompany}>
                    <Text style={styles.expTitle}>{item.title}</Text>
                    <Text style={styles.expCompany}>{item.companyName}</Text>
                  </View>
                  <Text style={styles.expDates}>
                    {`(${moment(item.startDate).format("MMM YYYY")} - ${
                      item.endDate === "Currently working"
                        ? "Currently working"
                        : moment(item.endDate).isValid()
                        ? moment(item.endDate).format("MMM YYYY")
                        : ""
                    })`}
                  </Text>
                </View>
                {item.description && (
                  <View style={styles.expDescItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 11, flex: 1, color: "#000" }}>
                      {item.description}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>EDUCATION</Text>
            <View style={styles.eduGrid}>
              {data.education.map((item: any, i: number) => (
                <View key={i} style={styles.eduCol}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.eduDegree}>{item.degree}</Text>
                  </View>
                  {item.startDate && item.endDate && (
                    <Text style={styles.eduDates}>
                      {`(${item.startDate} - ${item.endDate})`}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillText}>{data.skills.join(", ")}</Text>
            </View>
          </View>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>CERTIFICATIONS</Text>
            <View style={styles.certificationsGrid}>
              {data.certifications.map((item: any, i: number) => (
                <View key={i} style={styles.certificationCol}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={{ fontSize: 10, flex: 1, color: "#000" }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>LANGUAGES</Text>
            <View style={styles.languagesGrid}>
              {data.languages.map((item: any, i: number) => (
                <View key={i} style={styles.languageCol}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={{ fontSize: 10, flex: 1, color: "#000" }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}

        <View style={styles.section}>
          <Text style={styles.heading}>PROJECTS</Text>
          <View style={{ paddingLeft: 12, marginTop: 6 }}>
            {data.projects.map((item: any, i: number) => (
              <View key={i} style={styles.projectBlock}>
                <View style={styles.projectHeader}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.projectName}>{item.name}</Text>
                </View>
                <Text style={styles.projectDesc}>{item.description}</Text>
                {(item.github || item.live) && (
                  <View style={styles.projectLinks}>
                    {item.github && (
                      <Link src={item.github} style={styles.projectLink}>
                        GitHub
                      </Link>
                    )}
                    {item.live && (
                      <Link src={item.live} style={styles.projectLink}>
                        live demo
                      </Link>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Custom Section 2 */}
        {data.customSection2 && data.customSection2.length > 0 && (
          <>
            {data.customSection2.map((item: any, idx: number) => (
              <View key={idx} style={styles.section}>
                <Text style={[styles.heading, { textTransform: "capitalize" }]}>
                  {item.title}
                </Text>
                <View style={styles.customSectionList}>
                  {item.value.map((val: any, i: number) => (
                    <View key={i} style={styles.customSectionItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={{ fontSize: 11, flex: 1, color: "#000" }}>
                        {val}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
