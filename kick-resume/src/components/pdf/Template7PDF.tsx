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

// const LEFT_BG = "#e9eef6";
// const RIGHT_BG = "#7b7266";
// const DARK_TEXT = "#222";
// const WHITE = "#fff";

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: LEFT_BG,
//     fontSize: 12,
//     fontFamily: "Helvetica",
//     color: DARK_TEXT,
//     padding: 0,
//   },
//   mainGrid: {
//     flexDirection: "row",
//     width: "100%",
//     minHeight: "100%",
//   },
//   leftCol: {
//     width: "65%",
//     backgroundColor: LEFT_BG,
//     paddingVertical: 24,
//     paddingHorizontal: 28,
//     color: DARK_TEXT,
//   },
//   rightCol: {
//     width: "35%",
//     // backgroundColor: RIGHT_BG,
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//     color: WHITE,
//     alignItems: "center",
//   },
//   imageWrapper: {
//     marginTop: 8,
//     marginBottom: 24,
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     backgroundColor: "#bdbdbd",
//   },
//   sectionTitleLeft: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: DARK_TEXT,
//     marginTop: 18,
//     marginBottom: 8,
//     textAlign: "left",
//   },
//   sectionTitleRight: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: WHITE,
//     marginTop: 18,
//     marginBottom: 8,
//     textAlign: "left",
//     width: "100%",
//   },
//   dividerLeft: {
//     height: 1,
//     backgroundColor: "#bdbdbd",
//     marginVertical: 16,
//     width: "100%",
//   },
//   dividerRight: {
//     height: 1,
//     backgroundColor: WHITE,
//     marginVertical: 16,
//     width: "100%",
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: DARK_TEXT,
//     marginBottom: 2,
//   },
//   role: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: DARK_TEXT,
//     marginBottom: 12,
//   },
//   contactBlock: {
//     marginBottom: 8,
//   },
//   contactRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   contactLabel: {
//     fontWeight: "bold",
//     marginRight: 4,
//     color: DARK_TEXT,
//     fontSize: 12,
//     minWidth: 55,
//   },
//   contactValue: {
//     color: DARK_TEXT,
//     fontSize: 12,
//   },
//   summary: {
//     fontSize: 12,
//     color: DARK_TEXT,
//     marginBottom: 10,
//     marginTop: 2,
//     lineHeight: 1.5,
//   },
//   expBlock: {
//     marginBottom: 12,
//   },
//   expCompany: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: DARK_TEXT,
//     marginRight: 6,
//   },
//   expRole: {
//     fontWeight: "bold",
//     fontSize: 11,
//     color: DARK_TEXT,
//     marginRight: 6,
//   },
//   expDates: {
//     fontSize: 10,
//     color: "#888",
//     marginLeft: 2,
//   },
//   expDesc: {
//     fontSize: 11,
//     color: DARK_TEXT,
//     marginTop: 2,
//     marginBottom: 2,
//     lineHeight: 1.4,
//   },
//   projectBlock: {
//     marginBottom: 14,
//   },
//   projectName: {
//     fontWeight: "bold",
//     fontSize: 13,
//     color: DARK_TEXT,
//     marginBottom: 2,
//   },
//   projectDesc: {
//     fontSize: 11,
//     color: DARK_TEXT,
//     marginBottom: 2,
//   },
//   projectLinks: {
//     flexDirection: "row",
//     gap: 32,
//     marginTop: 2,
//   },
//   projectLink: {
//     fontSize: 11,
//     color: DARK_TEXT,
//     textDecoration: "underline",
//     marginRight: 24,
//   },
//   list: {
//     marginBottom: 10,
//     paddingLeft: 12,
//     width: "100%",
//   },
//   listItemRight: {
//     color: WHITE,
//     fontSize: 12,
//     marginBottom: 4,
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   bullet: {
//     color: WHITE,
//     marginRight: 6,
//     fontSize: 14,
//     marginTop: -1,
//   },
// });

// export default function Template7PDF({
//   data,
//   imageUrl,
//   imageBgColor,
//   color,
//   size,
// }: {
//   data: any;
//   imageUrl: string;
//   imageBgColor?: string;
//   color: any;
//   size: PageProps["size"];
// }) {
//   return (
//     <Document>
//       <Page size={size} style={styles.page}>
//         <View style={styles.mainGrid}>
//           {/* Left Column */}
//           <View style={styles.leftCol}>
//             {/* Name & Role */}
//             <Text style={styles.name}>{data.name}</Text>
//             <Text style={styles.role}>{data.role}</Text>
//             {/* Contact Info */}
//             <View style={styles.contactBlock}>
//               <View style={styles.contactRow}>
//                 <Text style={styles.contactLabel}>Phone:</Text>
//                 <Text style={styles.contactValue}>+{data.phone || ""}</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <Text style={styles.contactLabel}>Email:</Text>
//                 <Text style={styles.contactValue}>{data.email || ""}</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <Text style={styles.contactLabel}>Address:</Text>
//                 <Text style={styles.contactValue}>{data.address || ""}</Text>
//               </View>
//             </View>
//             <View style={styles.dividerLeft} />
//             {/* Summary */}
//             <Text style={styles.sectionTitleLeft}>Summary</Text>
//             <Text style={styles.summary}>{data.summary}</Text>
//             <View style={styles.dividerLeft} />
//             {/* Experience */}
//             <Text style={styles.sectionTitleLeft}>Experience</Text>
//             {data.experience?.map((item: any, i: number) => (
//               <View key={i} style={styles.expBlock}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <Text style={styles.expCompany}>{item.companyName}</Text>
//                   <Text style={styles.expRole}>{item.title}</Text>
//                   <Text style={styles.expDates}>
//                     ({item.startDate}{" "}
//                     {item.endDate && item.endDate !== "Currently working"
//                       ? ` ${item.endDate}`
//                       : item.endDate}
//                     )
//                   </Text>
//                 </View>
//                 <Text style={styles.expDesc}>{item.description}</Text>
//               </View>
//             ))}
//             <View style={styles.dividerLeft} />
//             {/* Projects */}
//             <Text style={styles.sectionTitleLeft}>Projects</Text>
//             {data.projects?.map((item: any, i: number) => (
//               <View key={i} style={styles.projectBlock}>
//                 <Text style={styles.projectName}>{item.name}</Text>
//                 <Text style={styles.projectDesc}>{item.description}</Text>
//                 <View style={styles.projectLinks}>
//                   <Link
//                     style={styles.projectLink}
//                     src={item.github || "/aiprompt"}
//                   >
//                     GitHub
//                   </Link>
//                   <Link
//                     style={styles.projectLink}
//                     src={item.live || "/aiprompt"}
//                   >
//                     live demo
//                   </Link>
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* Right Column */}
//           <View
//             style={{
//               ...styles.rightCol,
//               backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
//             }}
//           >
//             {/* Image */}
//             <View
//               style={{
//                 ...styles.imageWrapper,
//                 backgroundColor:
//                   imageBgColor || styles.imageWrapper.backgroundColor,
//               }}
//             >
//               {imageUrl ? (
//                 // eslint-disable-next-line jsx-a11y/alt-text
//                 <Image
//                   src={imageUrl}
//                   style={{
//                     width: 150,
//                     height: 150,
//                     borderRadius: 75,
//                     objectFit: "cover",
//                   }}
//                 />
//               ) : (
//                 <View
//                   style={{
//                     width: 120,
//                     height: 120,
//                     borderRadius: 60,
//                     backgroundColor: "#eee",
//                   }}
//                 />
//               )}
//             </View>
//             {/* Education */}
//             {data.education?.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitleRight}>Education</Text>
//                 <View style={styles.list}>
//                   {data.education.map((item: any, i: number) => (
//                     <View key={i} style={styles.listItemRight}>
//                       <Text style={styles.bullet}>•</Text>
//                       <Text>{item.degree}</Text>
//                     </View>
//                   ))}
//                 </View>
//                 <View style={styles.dividerRight} />
//               </>
//             )}
//             {/* Skills */}
//             {data.skills?.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitleRight}>Skills</Text>
//                 <View style={styles.list}>
//                   {data.skills.map((item: any, i: number) => (
//                     <View key={i} style={styles.listItemRight}>
//                       <Text style={styles.bullet}>•</Text>
//                       <Text>{item}</Text>
//                     </View>
//                   ))}
//                 </View>
//                 <View style={styles.dividerRight} />
//               </>
//             )}
//             {/* Languages */}
//             {data.languages?.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitleRight}>Languages</Text>
//                 <View style={styles.list}>
//                   {data.languages.map((item: any, i: number) => (
//                     <View key={i} style={styles.listItemRight}>
//                       <Text style={styles.bullet}>•</Text>
//                       <Text>{item}</Text>
//                     </View>
//                   ))}
//                 </View>
//                 <View style={styles.dividerRight} />
//               </>
//             )}
//             {/* Certifications */}
//             {data.certifications?.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitleRight}>Certifications</Text>
//                 <View style={styles.list}>
//                   {data.certifications.map((item: any, i: number) => (
//                     <View key={i} style={styles.listItemRight}>
//                       <Text style={styles.bullet}>•</Text>
//                       <Text>{item}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
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

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "row",
    backgroundColor: "#eef5ff",
  },
  leftCol: {
    width: "65%",
    padding: 12,
    paddingLeft: 20,
    paddingRight: 10,
    minHeight: "100%",
    color: "#374151", // gray-700
  },
  rightCol: {
    width: "35%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    minHeight: "100%",
    color: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 8,
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  personalInfoContainer: {
    marginBottom: 8,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  personalInfoLabel: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
    color: "#374151",
  },
  personalInfoValue: {
    fontSize: 9,
    color: "#374151",
  },
  dividerLeft: {
    height: 1,
    backgroundColor: "#374151",
    marginTop: 12,
    marginBottom: 12,
  },
  dividerRight: {
    height: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitleLeft: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 5,
    marginBottom: 8,
  },
  sectionTitleRight: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 1.5,
    marginTop: 8,
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: "#d1d5db",
    marginLeft: 35,
    marginTop: 12,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
  },
  expbullet: {
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 6,
  },
  expBlock: {
    marginTop: 12,
    paddingLeft: 0,
  },
  expHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 4,
  },
  expCompany: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#374151",
  },
  expTitle: {
    fontWeight: "normal",
    fontSize: 10,
    color: "#374151",
  },
  expDesc: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 4,
  },
  expDates: {
    fontSize: 8,
    color: "#374151",
  },
  projectBlock: {
    marginTop: 12,
    marginBottom: 20,
    paddingLeft: 0,
  },
  projectName: {
    fontWeight: "500",
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  projectBullet: {
    fontWeight: "500",
    fontSize: 14,
    color: "#374151",
  },
  projectDesc: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 12,
  },
  projectLinks: {
    flexDirection: "row",
    gap: 100,
  },
  projectLink: {
    fontSize: 11,
    color: "#374151",
    textDecoration: "none",
  },
  listRight: {
    paddingLeft: 6,
    marginTop: 0,
  },
  listItemRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    color: "#fff",
  },
  customSectionList: {
    marginTop: 6,
  },
  customSectionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  customBullet: {
    fontSize: 12,
    marginRight: 6,
  },
});

export default function Template7PDF({
  data,
  imageUrl,
  imageBgColor,
  color,
  size,
}: {
  data: any;
  imageUrl?: string;
  imageBgColor?: string;
  color: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Left Column (65%) */}
        <View style={styles.leftCol}>
          {/* Name & Role */}
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>

          {/* Personal Information */}
          {data.personalInformation && data.personalInformation.length > 0 ? (
            <View style={styles.personalInfoContainer}>
              {data.personalInformation.map((item: any, idx: number) => (
                <View key={idx} style={styles.personalInfoItem}>
                  <Text style={styles.personalInfoLabel}>{item.title}:</Text>
                  <Text style={styles.personalInfoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Divider */}
          <View style={styles.dividerLeft} />

          {/* Summary */}
          <Text style={styles.sectionTitleLeft}>Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>

          {/* Divider */}
          <View style={styles.dividerLeft} />

          {/* Experience */}
          <Text style={styles.sectionTitleLeft}>Experience</Text>

          <View>
            {data.experience.map((item: any, i: number) => (
              <View
                key={i}
                style={styles.expBlock}
                wrap={false}
                minPresenceAhead={40}
              >
                <View style={styles.expHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Text style={styles.expbullet}>•</Text>
                    <Text style={styles.expCompany}>{item.companyName}</Text>
                  </View>
                  <Text style={styles.expTitle}>{item.title}</Text>
                </View>
                <Text style={styles.expDesc}>{item.description}</Text>
                <View style={{ flexDirection: "row" }}>
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
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.dividerLeft} />

          {/* Projects */}
          <Text style={styles.sectionTitleLeft}>Projects</Text>

          <View style={{ paddingLeft: 0, marginTop: 0 }}>
            {data.projects.map((item: any, i: number) => (
              <View
                key={i}
                style={styles.projectBlock}
                wrap={false}
                minPresenceAhead={50}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <Text style={styles.projectBullet}>•</Text>
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

          {/* Custom Section 2 */}
          {data.customSection2 && data.customSection2.length > 0 && (
            <>
              {data.customSection2.map((item: any, idx: number) => (
                <View key={idx}>
                  <View style={styles.dividerLeft} />
                  <Text
                    style={[
                      styles.sectionTitleLeft,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.customSectionList}>
                    {item.value.map((val: any, i: number) => (
                      <View
                        key={i}
                        style={styles.customSectionItem}
                        wrap={false}
                      >
                        <Text style={styles.customBullet}>•</Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#374151",
                            flex: 1,
                            marginLeft: 20,
                          }}
                        >
                          {val}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Right Column (35%) */}
        <View
          style={{
            ...styles.rightCol,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
          }}
        >
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
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
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

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>Education</Text>
              <View style={styles.listRight}>
                {data.education.map((item: any, i: number) => (
                  <View key={i} style={styles.listItemRight}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 10, color: "#fff", flex: 1 }}>
                      {item.degree}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.dividerRight} />
            </>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>Skills</Text>
              <View style={styles.listRight}>
                {data.skills.map((item: any, i: number) => (
                  <View key={i} style={styles.listItemRight}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 10, color: "#fff", flex: 1 }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.dividerRight} />
            </>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>Languages</Text>
              <View style={styles.listRight}>
                {data.languages.map((item: any, i: number) => (
                  <View key={i} style={styles.listItemRight}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 10, color: "#fff", flex: 1 }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.dividerRight} />
            </>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>Certifications</Text>
              <View style={styles.listRight}>
                {data.certifications.map((item: any, i: number) => (
                  <View key={i} style={styles.listItemRight}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 10, color: "#fff", flex: 1 }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Custom Section */}
          {data.customSection && data.customSection.length > 0 && (
            <>
              {data.customSection.map((item: any, idx: number) => (
                <View key={idx}>
                  <View style={styles.dividerRight} />
                  <Text
                    style={[
                      styles.sectionTitleRight,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.listRight}>
                    {item.value.map((val: any, i: number) => (
                      <View key={i} style={styles.listItemRight}>
                        <Text style={styles.bullet}>•</Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#fff",
                            flex: 1,
                            textTransform: "capitalize",
                          }}
                        >
                          {val}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}
