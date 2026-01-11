import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Page 1: Invoice Styles
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottom: 2, borderBottomColor: '#0033A1', paddingBottom: 10 },
  logo: { width: 50, height: 50, marginBottom: 5 },
  companyInfo: { color: '#0033A1' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0033A1' },
  section: { marginVertical: 10 },
  label: { fontWeight: 'bold', marginBottom: 2, fontSize: 11 },
  table: { display: 'table', width: 'auto', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingVertical: 5 },
  tableHeader: { backgroundColor: '#0033A1', color: '#FFF', fontWeight: 'bold' },
  col1: { width: '70%', paddingLeft: 5 },
  col2: { width: '30%', textAlign: 'right', paddingRight: 5 },
  totalSection: { marginTop: 15, alignItems: 'flex-end' },
  totalBox: { width: 180, borderTop: 1, borderTopColor: '#0033A1', paddingTop: 5 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  grandTotal: { fontWeight: 'bold', color: '#0033A1', borderTop: 1, borderTopColor: '#EEE', marginTop: 4, paddingTop: 4 },
  addressContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, borderTop: 1, borderTopColor: '#EEE', paddingTop: 10 },
  addressBox: { width: '48%', fontSize: 8.5, color: '#555' },
  footer: { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, color: '#999', textAlign: 'center' },

  // Page 2: Terms Styles
  termsPage: { padding: 50, fontSize: 9, fontFamily: 'Helvetica', color: '#333', lineHeight: 1.5 },
  termsTitle: { fontSize: 14, fontWeight: 'bold', color: '#0033A1', marginBottom: 15, textAlign: 'center' },
  termsSection: { marginBottom: 10 },
  termsHeader: { fontWeight: 'bold', color: '#0033A1', marginBottom: 3 }
});

const InvoiceTemplate = ({ data }) => {
  const vatRate = 0.15;
  const subtotal = data.total / (1 + vatRate);
  const vatAmount = data.total - subtotal;

  return (
    <Document>
      {/* PAGE 1: THE INVOICE */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image 
              style={styles.logo} 
              src="https://res.cloudinary.com/dkmzveqce/image/upload/v1767100727/ChatGPT_Image_Dec_30_2025_03_08_48_PM_jppkez.png" 
            />
            <View style={styles.companyInfo}>
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>MKH DEBTORS & SOLUTIONS</Text>
              <Text>info@mkhdebtors.co.za</Text>
              <Text>www.mkhdebtors.co.za</Text>
            </View>
          </View>
          <Text style={styles.title}>INVOICE</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bill To:</Text>
          <Text>{data.clientName}</Text>
          <Text>{data.clientEmail}</Text>
          <Text>Reference: {data.caseRef}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>Service Description</Text>
            <Text style={styles.col2}>Amount</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>R {parseFloat(item.amount).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalBox}>
            <View style={styles.totalRow}><Text>Subtotal:</Text><Text>R {subtotal.toFixed(2)}</Text></View>
            <View style={styles.totalRow}><Text>VAT (15%):</Text><Text>R {vatAmount.toFixed(2)}</Text></View>
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text>Total Due:</Text>
              <Text>R {data.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#F8F9FA', borderRadius: 4 }}>
          <Text style={[styles.label, { color: '#0033A1' }]}>Banking Details:</Text>
          <Text>Bank: First National Bank (FNB)</Text>
          <Text>Account Holder: MKH Debtors Associates</Text>
          <Text>Account No: 63140304302</Text>
          <Text>Branch: 255355</Text>
          <Text>Ref: Name & Surname</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressBox}>
            <Text style={{ fontWeight: 'bold', color: '#0033A1' }}>Burgersfort Office</Text>
            <Text>10 Tambotie St, Aloe Ridge, 1150</Text>
            <Text>Landline: +27 13 170 6148</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={{ fontWeight: 'bold', color: '#0033A1' }}>Pretoria Office</Text>
            <Text>Office 326, 190 Thabo Sehume St, 0002</Text>
            <Text>Landline: +27 12 023 4324</Text>
          </View>
        </View>

        <Text style={styles.footer}>See Page 2 for Terms and Conditions</Text>
      </Page>

      {/* PAGE 2: TERMS AND CONDITIONS */}
      <Page size="A4" style={styles.termsPage}>
        <Text style={styles.termsTitle}>TERMS AND CONDITIONS</Text>
        
        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>1. No Refunds</Text>
          <Text>
            Our company strictly adheres to a no-refund policy for all services rendered.
            Once payment is made for prescription letters, debt review removals, judgment removals,
            paid-up letters, or settlement letters, it is non-refundable.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>2. Service Timelines</Text>
          <Text>
            We will make every effort to process requests within the stated
            timelines. However, delays may occur due to factors beyond our control, such as credit
            provider response times or bureaucratic processes.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>3. Client Responsibility</Text>
          <Text>clients are responsible for providing accurate and complete
                information required for the services. Any inaccuracies or omissions may delay or affect the
                outcome of the request.</Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>4. Third-Party Dependencies</Text>
          <Text>For services like debt review removals, judgment removals, or
                prescription letters, our company relies on third-party credit providers, credit bureaus, or
                courts to process and update records. We are not liable for delays or failures caused by
                these third parties.</Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>5. Communication</Text>
          <Text>All communication regarding the status of your request will be done via
                email or phone, as provided during the onboarding process. It is the client's responsibility to
                ensure their contact details are up-to-date.</Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>6. Service Delivery</Text>
          <Text>Delivery:Our company will deliver the requested documents or updates
                electronically or by post, depending on the client's preference and the nature of the service.</Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsHeader}>7. Acceptance</Text>
          <Text>By engaging our services, clients acknowledge that they have read, understood, and accepted these terms and conditions.</Text>
        </View>

        <Text style={styles.footer}>MKH Debtors & Solutions - Registered Debt Recovery Specialist</Text>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;