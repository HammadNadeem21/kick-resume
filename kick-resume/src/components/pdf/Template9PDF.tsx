// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Link,
//   Image,
// } from "@react-pdf/renderer";
// import type { PageProps } from "@react-pdf/renderer";

// const PRIMARY_BLUE = "#004aad";
// const LIGHT_BLUE_BG = "#eef3f7"; // Approximate light blue from image
// const DARK_TEXT = "#222";
// const GRAY_TEXT = "#555";

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#fff",
//     fontSize: 12,
//     fontFamily: "Helvetica",
//     color: DARK_TEXT,
//     padding: 30, // Global padding
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     paddingBottom: 10,
//     // backgroundColor: LIGHT_BLUE_BG, // Header background color
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   imageContainer: {
//     width: 130,
//     height: 130,
//     borderRadius: 75,
//     overflow: "hidden",
//     marginRight: 20,
//     backgroundColor: "#eee",
//   },
//   headerContent: {
//     flexGrow: 1,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: PRIMARY_BLUE,
//     marginBottom: 2,
//   },
//   role: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: PRIMARY_BLUE,
//     marginBottom: 10,
//   },
//   contactGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopWidth: 2,
//     borderTopColor: PRIMARY_BLUE,
//     marginTop: 5,
//     paddingTop: 5,
//   },
//   contactItem: {
//     paddingLeft: 5,
//     paddingRight: 5,
//     flexGrow: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 30,
//     textAlign: "center",
//     width: 100,
//   },
//   contactText: {
//     fontSize: 9,
//     color: DARK_TEXT,
//     textAlign: "center",
//   },
//   verticalDivider: {
//     width: 2,
//     backgroundColor: PRIMARY_BLUE,
//   },
//   sectionTitleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitleText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: PRIMARY_BLUE,
//     textTransform: "uppercase",
//     marginRight: 10,
//   },
//   sectionTitleDivider: {
//     flexGrow: 1,
//     height: 2,
//     backgroundColor: PRIMARY_BLUE,
//   },
//   summaryText: {
//     fontSize: 11,
//     color: DARK_TEXT,
//     lineHeight: 1.4,
//     fontStyle: "italic",
//   },
//   list: {
//     // Re-added for education and general lists
//     marginBottom: 10,
//     paddingLeft: 12, // Indent for bullets
//   },
//   listItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 3,
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   bullet: {
//     color: DARK_TEXT,
//     marginRight: 6,
//     fontSize: 11,
//     marginTop: -1,
//   },
//   expBlock: {
//     marginBottom: 10,
//   },
//   expHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   expTitleCompany: {
//     flexDirection: "row",
//     alignItems: "baseline",
//   },
//   expTitle: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: DARK_TEXT,
//     marginRight: 5,
//   },
//   expCompany: {
//     fontSize: 11,
//     color: DARK_TEXT,
//   },
//   expDates: {
//     fontSize: 9,
//     color: GRAY_TEXT,
//   },
//   expDesc: {
//     fontSize: 10,
//     color: DARK_TEXT,
//     marginLeft: 12,
//     lineHeight: 1.3,
//   },
//   skillsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 5,
//   },
//   skillItem: {
//     width: "33%", // 3 columns
//     marginBottom: 5,
//   },
//   certGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 5,
//   },
//   certItem: {
//     width: "100%", // 2 columns
//     marginBottom: 5,
//   },
//   projectGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginTop: 5,
//   },
//   projectBlock: {
//     width: "48%", // Two columns with some gap
//     marginBottom: 15,
//   },
//   projectName: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: DARK_TEXT,
//     marginBottom: 2,
//   },
//   projectDesc: {
//     fontSize: 10,
//     color: DARK_TEXT,
//     lineHeight: 1.3,
//     marginBottom: 5,
//   },
//   projectLinks: {
//     flexDirection: "row",
//     gap: 20,
//   },
//   projectLink: {
//     fontSize: 10,
//     color: PRIMARY_BLUE,
//     textDecoration: "underline",
//   },
// });

// export default function Template9PDF({
//   data,
//   imageUrl,
//   imageBgColor,
//   size,
// }: {
//   data: any;
//   imageUrl?: string;
//   imageBgColor?: string;
//   size: PageProps["size"];
// }) {
//   return (
//     <Document>
//       <Page size={size} style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View
//             style={{
//               ...styles.imageContainer,
//               backgroundColor:
//                 imageBgColor || styles.imageContainer.backgroundColor,
//             }}
//           >
//             {imageUrl ? (
//               // eslint-disable-next-line jsx-a11y/alt-text
//               <Image
//                 src={imageUrl}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               <View
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "#eee",
//                 }}
//               />
//             )}
//           </View>
//           <View style={styles.headerContent}>
//             <Text style={styles.name}>{data.name}</Text>
//             <Text style={styles.role}>{data.role}</Text>
//             <View style={styles.contactGrid}>
//               <View
//                 style={{
//                   ...styles.contactItem,
//                   flexShrink: 1,
//                   flexGrow: 1,
//                   minWidth: 0,
//                 }}
//               >
//                 <Text style={{ ...styles.contactText, flexWrap: "wrap" }}>
//                   {data.email !== "" ? data.email : "Email"}
//                 </Text>
//               </View>
//               <View style={styles.verticalDivider} />
//               <View style={styles.contactItem}>
//                 <Text style={styles.contactText}>
//                   {data.phone && data.phone !== 0 ? `+${data.phone}` : "Phone"}
//                 </Text>
//               </View>
//               <View style={styles.verticalDivider} />
//               <View style={styles.contactItem}>
//                 <Text style={styles.contactText}>
//                   {data.address !== "" ? data.address : "Address"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Profile Summary */}
//         {data.summary && (
//           <>
//             <View style={styles.sectionTitleContainer}>
//               <Text style={styles.sectionTitleText}>PROFILE SUMMARY</Text>
//               <View style={styles.sectionTitleDivider} />
//             </View>
//             <Text style={styles.summaryText}>{data.summary}</Text>
//           </>
//         )}

//         {/* Education */}
//         {data.education?.length > 0 && (
//           <>
//             <View style={styles.sectionTitleContainer}>
//               <Text style={styles.sectionTitleText}>EDUCATION</Text>
//               <View style={styles.sectionTitleDivider} />
//             </View>
//             <View style={styles.list}>
//               {data.education.map((item: any, i: number) => (
//                 <View key={i} style={styles.listItem}>
//                   <Text style={styles.bullet}>•</Text>
//                   <Text>{item.degree}</Text>
//                   {item.startDate && item.endDate && (
//                     <Text
//                       style={{
//                         fontSize: 9,
//                         color: GRAY_TEXT,
//                         marginLeft: "auto",
//                       }}
//                     >
//                       ({item.startDate} - {item.endDate})
//                     </Text>
//                   )}
//                 </View>
//               ))}
//             </View>
//           </>
//         )}

//         {/* Work Experience */}
//         {data.experience?.length > 0 && (
//           <>
//             <View style={styles.sectionTitleContainer}>
//               <Text style={styles.sectionTitleText}>WORK EXPERIENCE</Text>
//               <View style={styles.sectionTitleDivider} />
//             </View>
//             <View>
//               {data.experience.map((item: any, i: number) => (
//                 <View key={i} style={styles.expBlock}>
//                   <View style={styles.expHeader}>
//                     <View style={styles.expTitleCompany}>
//                       <Text style={styles.expTitle}>{item.title}</Text>
//                       <Text style={styles.expCompany}>
//                         | {item.companyName}
//                       </Text>
//                     </View>
//                     <Text style={styles.expDates}>
//                       ({item.startDate} - {item.endDate})
//                     </Text>
//                   </View>
//                   {item.description && (
//                     <View style={styles.listItem}>
//                       <Text style={styles.bullet}>•</Text>
//                       <Text style={styles.expDesc}>{item.description}</Text>
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>
//           </>
//         )}

//         {/* Professional Skill & Certifications */}
//         {(data.skills?.length > 0 || data.certifications?.length > 0) && (
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginTop: 20,
//             }}
//           >
//             {/* Professional Skill */}
//             {data.skills?.length > 0 && (
//               <View style={{ width: "50%" }}>
//                 <View style={styles.sectionTitleContainer}>
//                   <Text style={styles.sectionTitleText}>
//                     PROFESSIONAL SKILL
//                   </Text>
//                   <View style={styles.sectionTitleDivider} />
//                 </View>
//                 <View style={styles.skillsGrid}>
//                   {data.skills.map((item: string, i: number) => (
//                     <View key={i} style={styles.skillItem}>
//                       <View style={styles.listItem}>
//                         <Text style={styles.bullet}>•</Text>
//                         <Text>{item}</Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {/* Certifications */}
//             {data.certifications?.length > 0 && (
//               <View style={{ width: "50%", paddingLeft: 10 }}>
//                 <View style={styles.sectionTitleContainer}>
//                   <Text style={styles.sectionTitleText}>CERTIFICATIONS</Text>
//                   <View style={styles.sectionTitleDivider} />
//                 </View>
//                 <View style={styles.certGrid}>
//                   {data.certifications.map((item: string, i: number) => (
//                     <View key={i} style={styles.certItem}>
//                       <View style={styles.listItem}>
//                         <Text style={styles.bullet}>•</Text>
//                         <Text>{item}</Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}
//           </View>
//         )}

//         {/* Projects */}
//         {data.projects?.length > 0 && (
//           <>
//             <View style={styles.sectionTitleContainer}>
//               <Text style={styles.sectionTitleText}>PROJECTS</Text>
//               <View style={styles.sectionTitleDivider} />
//             </View>
//             <View style={styles.projectGrid}>
//               {data.projects.map((item: any, i: number) => (
//                 <View key={i} style={styles.projectBlock}>
//                   <View style={styles.listItem}>
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
//           </>
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
  Image,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import moment from "moment";

const PRIMARY_BLUE = "#004aad";
const DARK_TEXT = "#000";
const GRAY_TEXT = "#6b7280"; // gray-500

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eef5ff",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: DARK_TEXT,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 90,
    overflow: "hidden",
    backgroundColor: "#d1d5db", // gray-300
    marginTop: 0,
  },
  headerContent: {
    flex: 1,
  },
  nameRoleContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: PRIMARY_BLUE,
    paddingBottom: 8,
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },
  personalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    fontSize: 10,
    color: GRAY_TEXT,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
    color: "#4b5563",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY_BLUE,
    textTransform: "uppercase",
  },
  sectionDivider: {
    flex: 1,
    height: 1.5,
    backgroundColor: PRIMARY_BLUE,
  },
  summaryText: {
    fontSize: 10,
    // fontWeight: "300",
    color: "#1f2937", // gray-800
    lineHeight: 1.6,
    fontStyle: "italic",
    marginTop: 4,
  },
  eduList: {
    paddingLeft: 20,
    marginTop: 12,
  },
  eduItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  eduDegree: {
    fontSize: 10,
    color: "#000",
    flex: 1,
  },
  eduDates: {
    fontSize: 8,
    color: GRAY_TEXT,
  },
  bullet: {
    fontSize: 11,
    marginRight: 6,
    color: "#000",
  },
  expBlock: {
    marginTop: 12,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expTitleCompany: {
    fontSize: 12,
    color: "#000",
    flex: 1,
  },
  expDates: {
    fontSize: 8,
    color: "#000",
  },
  expDesc: {
    fontSize: 10,
    color: "#1f2937", // gray-800
    marginTop: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  skillsCertsContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 24,
  },
  skillsColumn: {
    flex: 1,
  },
  certsColumn: {
    flex: 1,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  skillItem: {
    width: "100%",
    fontSize: 10,
    color: "#000",
  },
  certsGrid: {
    paddingLeft: 20,
    marginTop: 12,
  },
  certItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  certText: {
    fontSize: 11,
    color: "#1f2937",
    flex: 1,
  },
  projectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
  },
  projectBlock: {
    width: "48%",
    marginBottom: 20,
  },
  projectName: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#000",
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 10,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 4,
  },
  projectLinks: {
    flexDirection: "row",
    gap: 100,
    marginTop: 2,
  },
  projectLink: {
    fontSize: 11,
    color: "#1f2937",
    textDecoration: "none",
  },
  customSectionList: {
    paddingLeft: 4,
    marginTop: 12,
  },
  customSectionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
});

export default function Template9PDF({
  data,
  imageUrl,
  imageBgColor,
  size,
}: {
  data: any;
  imageUrl?: string;
  imageBgColor?: string;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Profile Image */}
          <View
            style={{
              ...styles.imageContainer,
              backgroundColor: imageBgColor || "#d1d5db",
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#d1d5db",
                }}
              />
            )}
          </View>

          {/* Header Content */}
          <View style={styles.headerContent}>
            <View style={styles.nameRoleContainer}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.role}>{data.role}</Text>
            </View>

            {/* Personal Information */}
            {data.personalInformation && data.personalInformation.length > 0 ? (
              <View style={styles.personalInfoContainer}>
                {data.personalInformation.map((item: any, idx: number) => (
                  <View key={idx} style={styles.personalInfoItem}>
                    <Text style={styles.boldText}>{item.title}:</Text>
                    <Text style={{ fontSize: 9, marginTop: 1 }}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Profile Summary</Text>
          <View style={styles.sectionDivider} />
        </View>
        <Text style={styles.summaryText}>{data.summary}</Text>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.sectionDivider} />
            </View>
            <View style={styles.eduList}>
              {data.education.map((item: any, i: number) => (
                <View key={i} style={styles.eduItem}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.eduDegree}>{item.degree}</Text>
                  </View>
                  {item.startDate && item.endDate && (
                    <Text style={styles.eduDates}>
                      ({item.startDate} - {item.endDate})
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Work Experience */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={{ marginTop: 12 }}>
          {data.experience.map((item: any, i: number) => (
            <View key={i} style={styles.expBlock}>
              <View style={styles.expHeader}>
                <Text style={styles.expTitleCompany}>
                  {item.title} | {item.companyName}
                </Text>
                <Text style={styles.expDates}>
                  ({moment(item.startDate).format("MMM YYYY")} -{" "}
                  {item.endDate === "Currently working"
                    ? "Currently working"
                    : moment(item.endDate).isValid()
                    ? moment(item.endDate).format("MMM YYYY")
                    : ""}
                  )
                </Text>
              </View>
              {item.description && (
                <View style={styles.expDesc}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={{ fontSize: 10, color: "#1f2937", flex: 1 }}>
                    {item.description}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Skills & Certifications Side by Side */}
        {(data.skills && data.skills.length > 0) ||
        (data.certifications && data.certifications.length > 0) ? (
          <View style={styles.skillsCertsContainer}>
            {/* Professional Skills */}
            {data.skills && data.skills.length > 0 && (
              <View style={styles.skillsColumn}>
                <View style={[styles.sectionTitleContainer, { marginTop: 0 }]}>
                  <Text style={styles.sectionTitle}>Professional Skill</Text>
                  <View style={styles.sectionDivider} />
                </View>
                <View style={styles.skillsGrid}>
                  {data.skills.map((item: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        width: "30%",
                      }}
                    >
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.skillItem}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View style={styles.certsColumn}>
                <View style={[styles.sectionTitleContainer, { marginTop: 0 }]}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  <View style={styles.sectionDivider} />
                </View>
                <View style={styles.certsGrid}>
                  {data.certifications.map((item: any, i: number) => (
                    <View key={i} style={styles.certItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.certText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ) : null}

        {/* Projects */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.projectsGrid}>
          {data.projects.map((item: any, i: number) => (
            <View key={i} style={styles.projectBlock}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.projectName}>{item.name}</Text>
              </View>
              <View style={{ marginLeft: 4 }}>
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
            </View>
          ))}
        </View>

        {/* Custom Section 2 */}
        {data.customSection2 && data.customSection2.length > 0 && (
          <>
            {data.customSection2.map((item: any, idx: number) => (
              <View key={idx}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>{item.title}</Text>
                  <View style={styles.sectionDivider} />
                </View>
                <View style={styles.customSectionList}>
                  {item.value.map((val: any, i: number) => (
                    <View key={i} style={styles.customSectionItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={{ fontSize: 10, flex: 1, color: "#000" }}>
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
